from fastapi import APIRouter
from app.data import store

router = APIRouter(prefix="/rotas", tags=["Rotas Otimizadas"])


@router.get("/")
def listar_rotas():
    return store.rotas.to_dict(orient="records")


@router.get("/veiculo/{veiculo_id}")
def listar_rotas_por_veiculo(veiculo_id: str):
    df = store.get_rotas_por_veiculo(veiculo_id)
    return df.to_dict(orient="records")
