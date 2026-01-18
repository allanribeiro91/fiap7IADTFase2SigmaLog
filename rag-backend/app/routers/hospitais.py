from fastapi import APIRouter
from app.data import store

router = APIRouter(prefix="/hospitais", tags=["Hospitais"])


@router.get("/")
def listar_hospitais():
    return store.hospitais.to_dict(orient="records")
