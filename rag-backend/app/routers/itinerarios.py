from fastapi import APIRouter, HTTPException
from app.data import store

router = APIRouter(
    prefix="/itinerarios",
    tags=["Itinerários"]
)


@router.get("/")
def listar_itinerarios():
    itinerarios = []

    for veiculo_id in store.veiculos["id_veiculo"].unique():
        itinerarios.append(
            store.get_itinerario_por_veiculo(veiculo_id)
        )

    return itinerarios


@router.get("/{veiculo_id}")
def itinerario_por_veiculo(veiculo_id: str):
    try:
        return store.get_itinerario_por_veiculo(veiculo_id)
    except Exception:
        raise HTTPException(
            status_code=404,
            detail=f"Itinerário não encontrado para o veículo {veiculo_id}"
        )
