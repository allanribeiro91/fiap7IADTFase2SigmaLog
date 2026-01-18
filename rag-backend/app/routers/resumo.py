from fastapi import APIRouter
from app.data import store

router = APIRouter(prefix="/resumo", tags=["Resumo de Resultados"])


@router.get("/")
def resumo_resultados():
    return store.resumo.to_dict(orient="records")


@router.get("/kpis")
def kpis_globais():
    return store.get_kpis_globais()
