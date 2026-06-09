import React, { useMemo, useRef, useState } from "react";
import axios from "axios";
import { Bot, Send, User } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import "./AICareerChat.css";

const API_URL = "http://127.0.0.1:5000/career-chatbot/chat";

const starterPrompts = [
  "What career suits someone interested in technology and design?",
  "How do I choose between engineering and management?",
  "Which skills should I build for a data analyst role?",
];

export default function AICareerChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi, I can help you compare career paths, explore skills, and think through next steps.",
    },
  ]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const apiHistory = useMemo(
    () =>
      messages
        .filter((message) => message.role === "user" || message.role === "assistant")
        .map((message) => ({
          role: message.role,
          content: message.content,
        })),
    [messages]
  );

  const sendMessage = async (messageText = input) => {
    const trimmedMessage = messageText.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    const userMessage = {
      role: "user",
      content: trimmedMessage,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post(API_URL, {
        message: trimmedMessage,
        history: apiHistory,
      });

      if (!data.success) {
        throw new Error(data.issues?.[0] || "Chatbot could not answer right now.");
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: data.answer,
        },
      ]);
    } catch (chatError) {
      setError(
        chatError.response?.data?.issues?.[0] ||
          chatError.message ||
          "Unable to connect to the chatbot."
      );
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <main className="ai-chat-page">
      <section className="ai-chat-shell">
        <header className="ai-chat-header">
          <div>
            <p className="ai-chat-kicker">AI Career Advisor</p>
            <h1>Career Q&amp;A Chat</h1>
          </div>
          <div className="ai-chat-status">
            <span aria-hidden="true" />
            Online
          </div>
        </header>

        <div className="ai-chat-layout">
          <aside className="ai-chat-sidebar">
            <h2>Try Asking</h2>
            <div className="ai-chat-prompts">
              {starterPrompts.map((prompt) => (
                <button
                  type="button"
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  disabled={loading}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </aside>

          <section className="ai-chat-panel" aria-label="Career chatbot conversation">
            <div className="ai-chat-messages">
              {messages.map((message, index) => (
                <article
                  className={`ai-chat-message ${message.role}`}
                  key={`${message.role}-${index}`}
                >
                  <div className="ai-chat-avatar" aria-hidden="true">
                    {message.role === "assistant" ? <Bot size={18} /> : <User size={18} />}
                  </div>
                  {message.role === "assistant" ? (
                    <div className="ai-chat-bubble ai-chat-markdown">
                      <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
                    </div>
                  ) : (
                    <p className="ai-chat-bubble">{message.content}</p>
                  )}
                </article>
              ))}

              {loading && (
                <article className="ai-chat-message assistant">
                  <div className="ai-chat-avatar" aria-hidden="true">
                    <Bot size={18} />
                  </div>
                  <p className="ai-chat-typing">Thinking...</p>
                </article>
              )}
            </div>

            {error && <div className="ai-chat-error">{error}</div>}

            <form className="ai-chat-form" onSubmit={handleSubmit}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask about careers, skills, roles, or next steps..."
                rows="2"
              />
              <button type="submit" disabled={loading || !input.trim()} aria-label="Send message">
                <Send size={20} />
              </button>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}
