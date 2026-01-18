from fastapi import APIRouter
from app.data import store

router = APIRouter(prefix="/entregas", tags=["Entregas"])


@router.get("/")
def listar_entregas():
    return store.entregas.to_dict(orient="records")
