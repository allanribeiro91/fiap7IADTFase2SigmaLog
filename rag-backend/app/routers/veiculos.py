from fastapi import APIRouter
from app.data import store

router = APIRouter(prefix="/veiculos", tags=["Veículos"])


@router.get("/")
def listar_veiculos():
    return store.veiculos.to_dict(orient="records")
