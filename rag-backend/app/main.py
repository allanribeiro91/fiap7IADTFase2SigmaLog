from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from openai import OpenAI
from app.settings import settings
from app.data import store
from app.schemas import ChatRequest, ChatResponse
from app.rag import PROMPT_BASE, build_context, context_preview
from app.routers import veiculos, entregas, hospitais, rotas, resumo, itinerarios

app = FastAPI(title="Sigma Log - RAG API", version="0.1.0")

# CORS para o React local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount(
    "/static",
    StaticFiles(directory="app/static"),
    name="static"
)


client = OpenAI(api_key=settings.OPENAI_API_KEY)

@app.on_event("startup")
def startup():
    store.load()

# Inclui os routers
app.include_router(veiculos.router)
app.include_router(entregas.router)
app.include_router(hospitais.router)
app.include_router(rotas.router)
app.include_router(resumo.router)
app.include_router(itinerarios.router)
    
@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/chat", response_model=ChatResponse)
def chat(payload: ChatRequest):
    if not payload.question or not payload.question.strip():
        raise HTTPException(status_code=400, detail="Pergunta vazia.")

    used_mode, ctx = build_context(payload.question, payload.mode or "auto")

    messages = []
    messages.append({"role": "system", "content": PROMPT_BASE})

    # opcional: histórico (para UX melhor no chat)
    if payload.history:
        for m in payload.history[-8:]:  # limita para não explodir tokens
            messages.append({"role": m.role, "content": m.content})

    # contexto do RAG
    messages.append({"role": "system", "content": f"CONTEXTO (dados recuperados):\n{ctx}"})

    # pergunta do usuário
    messages.append({"role": "user", "content": payload.question})

    try:
        resp = client.chat.completions.create(
            model=settings.OPENAI_MODEL,
            messages=messages,
            temperature=0.2,
        )
        answer = resp.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao chamar LLM: {str(e)}")

    return ChatResponse(
        answer=answer,
        used_mode=used_mode,
        context_preview=context_preview(ctx),
    )
