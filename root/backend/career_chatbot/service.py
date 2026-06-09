import os
import threading
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

from dotenv import load_dotenv


DEFAULT_PROMPT_TEMPLATE = """
The following is a friendly conversation between a human and a Career Advisor.
The Advisor guides the user regarding jobs, interests, and career decisions.

Relevant previous conversation:
{context}

Useful information from career guidance books:
{text}

Useful information about career guidance from web search:
{web_knowledge}

Current message:
Human: {input}
Career Expert:
"""


@dataclass(frozen=True)
class CareerChatbotSettings:
    base_dir: Path
    pdf_dir: Path
    chroma_dir: Path
    chat_model: str
    embedding_model: str
    enable_web_search: bool

    @classmethod
    def from_env(cls, base_dir: Path | None = None) -> "CareerChatbotSettings":
        resolved_base_dir = base_dir or Path(__file__).resolve().parent
        load_dotenv(resolved_base_dir / ".env")

        return cls(
            base_dir=resolved_base_dir,
            pdf_dir=Path(os.getenv("CHATBOT_PDF_DIR", resolved_base_dir / "pdfs")),
            chroma_dir=Path(os.getenv("CHATBOT_CHROMA_DIR", resolved_base_dir / "chroma_db")),
            chat_model=os.getenv("GEMINI_CHAT_MODEL", "gemini-2.5-flash"),
            embedding_model=os.getenv("GEMINI_EMBEDDING_MODEL", "models/gemini-embedding-001"),
            enable_web_search=os.getenv("CHATBOT_ENABLE_WEB_SEARCH", "false").lower()
            in {"1", "true", "yes", "on"},
        )


class CareerChatbotService:
    def __init__(self, settings: CareerChatbotSettings | None = None):
        self.settings = settings or CareerChatbotSettings.from_env()
        self._vectors = None
        self._lock = threading.Lock()

    def answer(
        self,
        message: str,
        history: str | Iterable[dict] | None = None,
        temperature: float = 0,
    ) -> str:
        if not message or not message.strip():
            raise ValueError("Message is required.")

        self._configure_google()
        vectors = self._get_vectors()
        docs = vectors.similarity_search(message, k=4)
        web_knowledge = self._get_web_knowledge(message)

        prompt_template, chat_model_class = self._import_model_dependencies()
        prompt = prompt_template(
            input_variables=["context", "input", "text", "web_knowledge"],
            template=DEFAULT_PROMPT_TEMPLATE,
        )

        gemini_model = chat_model_class(
            model=self.settings.chat_model,
            temperature=temperature,
        )
        conversation = prompt | gemini_model

        try:
            response = conversation.invoke(
                {
                    "context": self.format_history(history),
                    "input": message,
                    "web_knowledge": web_knowledge,
                    "text": docs,
                }
            )
        except Exception as error:
            if "RESOURCE_EXHAUSTED" in str(error) or "429" in str(error):
                return (
                    "The Gemini API quota for this model is currently exhausted. "
                    "Please wait a minute and try again, or configure billing/quota in Google AI Studio. "
                    f"The app is currently using `{self.settings.chat_model}`."
                )
            raise

        return response.content

    @staticmethod
    def format_history(history: str | Iterable[dict] | None) -> str:
        if history is None:
            return ""

        if isinstance(history, str):
            return history

        formatted_messages = []
        for message in history:
            role = message.get("role")
            content = message.get("content", "")

            if role == "user":
                formatted_messages.append(f"input {content}")
            elif role == "assistant":
                formatted_messages.append(f"output {content}")

        return "\n".join(formatted_messages)

    def _get_vectors(self):
        if self._vectors is not None:
            return self._vectors

        with self._lock:
            if self._vectors is None:
                self._vectors = self._load_vectors()

        return self._vectors

    def _load_vectors(self):
        embeddings_class, text_splitter_class, pdf_loader_class, chroma_class = (
            self._import_vector_dependencies()
        )
        embeddings = embeddings_class(model=self.settings.embedding_model)

        if self.settings.chroma_dir.exists():
            return chroma_class(
                persist_directory=str(self.settings.chroma_dir),
                embedding_function=embeddings,
            )

        if not self.settings.pdf_dir.exists():
            raise FileNotFoundError(
                f"Chatbot PDF directory not found: {self.settings.pdf_dir}"
            )

        pdf_texts = []
        for pdf_file in self.settings.pdf_dir.glob("*.pdf"):
            loader = pdf_loader_class(str(pdf_file))
            documents = loader.load()
            pdf_texts.extend(document.page_content for document in documents)

        if not pdf_texts:
            raise FileNotFoundError(
                f"No PDF files found in chatbot PDF directory: {self.settings.pdf_dir}"
            )

        splitter = text_splitter_class(chunk_size=1000, chunk_overlap=200)
        chunks = splitter.split_text(" ".join(pdf_texts))

        return chroma_class.from_texts(
            texts=chunks,
            embedding=embeddings,
            persist_directory=str(self.settings.chroma_dir),
        )

    def _get_web_knowledge(self, message: str) -> str:
        if not self.settings.enable_web_search:
            return ""

        try:
            serp_api_wrapper = self._import_search_dependency()
            search = serp_api_wrapper(
                params={
                    "engine": os.getenv("CHATBOT_SEARCH_ENGINE", "bing"),
                    "gl": os.getenv("CHATBOT_SEARCH_GL", "us"),
                    "hl": os.getenv("CHATBOT_SEARCH_HL", "en"),
                }
            )
            return search.run(message)
        except Exception as error:
            return f"Web search was unavailable: {error}"

    def _configure_google(self) -> None:
        api_key = os.getenv("GOOGLE_API_KEY")
        if not api_key:
            raise RuntimeError("GOOGLE_API_KEY is missing in chatbot .env or backend .env.")

        genai = self._import_google_dependency()
        genai.configure(api_key=api_key)

    @staticmethod
    def _import_google_dependency():
        import google.generativeai as genai

        return genai

    @staticmethod
    def _import_model_dependencies():
        from langchain_core.prompts import PromptTemplate
        from langchain_google_genai import ChatGoogleGenerativeAI

        return PromptTemplate, ChatGoogleGenerativeAI

    @staticmethod
    def _import_vector_dependencies():
        from langchain_community.document_loaders import PyPDFLoader
        from langchain_community.vectorstores import Chroma
        from langchain_google_genai import GoogleGenerativeAIEmbeddings
        from langchain_text_splitters import RecursiveCharacterTextSplitter

        return (
            GoogleGenerativeAIEmbeddings,
            RecursiveCharacterTextSplitter,
            PyPDFLoader,
            Chroma,
        )

    @staticmethod
    def _import_search_dependency():
        from langchain_community.utilities import SerpAPIWrapper

        return SerpAPIWrapper
