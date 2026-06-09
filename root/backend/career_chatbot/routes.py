from flask import Blueprint, jsonify, request

from .service import CareerChatbotService


def create_career_chatbot_blueprint(
    service: CareerChatbotService | None = None,
) -> Blueprint:
    chatbot_service = service or CareerChatbotService()
    blueprint = Blueprint("career_chatbot", __name__, url_prefix="/career-chatbot")

    @blueprint.get("/health")
    def health():
        return jsonify(
            {
                "success": True,
                "message": "Career chatbot API running",
                "web_search_enabled": chatbot_service.settings.enable_web_search,
            }
        )

    @blueprint.post("/chat")
    def chat():
        try:
            payload = request.get_json(silent=True) or {}
            message = payload.get("message")
            history = payload.get("history", [])
            temperature = float(payload.get("temperature", 0))

            answer = chatbot_service.answer(
                message=message,
                history=history,
                temperature=temperature,
            )

            return jsonify(
                {
                    "success": True,
                    "answer": answer,
                }
            )
        except ValueError as error:
            return jsonify(
                {
                    "success": False,
                    "issues": [str(error)],
                }
            ), 400
        except Exception as error:
            return jsonify(
                {
                    "success": False,
                    "issues": [str(error)],
                }
            ), 500

    return blueprint
