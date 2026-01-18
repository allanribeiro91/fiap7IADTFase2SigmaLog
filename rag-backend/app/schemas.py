from pydantic import BaseModel
from typing import List, Literal, Optional

class ChatMessage(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str

class ChatRequest(BaseModel):
    question: str
    history: Optional[List[ChatMessage]] = None  # opcional, para manter contexto
    mode: Optional[Literal["auto", "resumo", "entrega", "kpi"]] = "auto"

class ChatResponse(BaseModel):
    answer: str
    used_mode: str
    context_preview: str  # útil para depuração/demonstração no vídeo
