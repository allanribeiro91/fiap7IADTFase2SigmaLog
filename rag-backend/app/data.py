import pandas as pd
from pathlib import Path
from app.settings import settings


class DataStore:
    def __init__(self):
        # Datasets brutos
        self.veiculos = None
        self.entregas = None
        self.hospitais = None
        self.rotas = None
        self.resumo = None

        # Views derivadas
        self.rotas_enriquecidas = None
        self.entregas_com_hospital = None

    # ------------------------------------------------------------------
    # Carga principal
    # ------------------------------------------------------------------
    def load(self):
        data_dir = Path(settings.DATA_DIR)

        self.veiculos = pd.read_csv(data_dir / "veiculos.csv")
        self.entregas = pd.read_csv(data_dir / "entregas.csv")
        self.hospitais = pd.read_csv(data_dir / "hospitais.csv")
        self.rotas = pd.read_csv(data_dir / "rotas_otimizadas.csv")
        self.resumo = pd.read_csv(data_dir / "resumo_resultados.csv")

        self._validate()
        self._normalize()
        self._build_views()

    # ------------------------------------------------------------------
    # Validação de schema
    # ------------------------------------------------------------------
    def _validate(self):
        schemas = {
            "veiculos": [
                "id_veiculo", "capacidade_kg", "autonomia_km",
                "velocidade_media_kmh", "custo_por_km"
            ],
            "entregas": [
                "id", "id_hospital", "nome", "lat", "lng",
                "prioridade", "peso_kg", "penalidade",
                "tempo_estimado_entrega_min"
            ],
            "hospitais": ["IdHospital", "Nome", "Latitude", "Longitude"],
            "rotas": [
                "veiculo_id", "ordem_na_rota", "entrega_id",
                "hospital_id", "hospital_nome", "prioridade",
                "peso_kg", "tempo_entrega_min", "lat", "lng"
            ],
            "resumo": [
                "veiculo_id", "distancia_km",
                "tempo_min", "custo_total", "qtd_entregas"
            ],
        }

        datasets = {
            "veiculos": self.veiculos,
            "entregas": self.entregas,
            "hospitais": self.hospitais,
            "rotas": self.rotas,
            "resumo": self.resumo,
        }

        for name, cols in schemas.items():
            missing = [c for c in cols if c not in datasets[name].columns]
            if missing:
                raise ValueError(f"{name}: colunas ausentes: {missing}")

    # ------------------------------------------------------------------
    # Normalizações
    # ------------------------------------------------------------------
    def _normalize(self):
        # IDs como string
        self.veiculos["id_veiculo"] = self.veiculos["id_veiculo"].astype(str)
        self.entregas["id"] = self.entregas["id"].astype(str)
        self.entregas["id_hospital"] = self.entregas["id_hospital"].astype(str)
        self.hospitais["IdHospital"] = self.hospitais["IdHospital"].astype(str)
        self.rotas["veiculo_id"] = self.rotas["veiculo_id"].astype(str)
        self.rotas["entrega_id"] = self.rotas["entrega_id"].astype(str)
        self.rotas["hospital_id"] = self.rotas["hospital_id"].astype(str)
        self.resumo["veiculo_id"] = self.resumo["veiculo_id"].astype(str)

        # Prioridade
        for df in [self.entregas, self.rotas]:
            df["prioridade"] = (
                df["prioridade"]
                .astype(str)
                .str.upper()
                .str.strip()
            )

        # Numéricos
        self.entregas["peso_kg"] = pd.to_numeric(
            self.entregas["peso_kg"], errors="coerce"
        ).fillna(0)

        self.rotas["tempo_entrega_min"] = pd.to_numeric(
            self.rotas["tempo_entrega_min"], errors="coerce"
        ).fillna(0)

    # ------------------------------------------------------------------
    # Views derivadas
    # ------------------------------------------------------------------
    def _build_views(self):
        # Entregas enriquecidas com hospitais
        self.entregas_com_hospital = self.entregas.merge(
            self.hospitais,
            left_on="id_hospital",
            right_on="IdHospital",
            how="left",
            suffixes=("", "_hospital"),
        )

        # Rotas enriquecidas com dados do veículo
        self.rotas_enriquecidas = self.rotas.merge(
            self.veiculos,
            left_on="veiculo_id",
            right_on="id_veiculo",
            how="left",
        )

    # ------------------------------------------------------------------
    # Métodos REST / Analíticos
    # ------------------------------------------------------------------
    def get_veiculos(self):
        return self.veiculos.copy()

    def get_rotas_por_veiculo(self, veiculo_id: str):
        return (
            self.rotas_enriquecidas
            .query("veiculo_id == @veiculo_id")
            .sort_values("ordem_na_rota")
        )

    def get_hospitais(self):
        return self.hospitais.copy()

    def get_kpis_globais(self) -> dict:
        return {
            "num_veiculos": int(self.veiculos["id_veiculo"].nunique()),
            "num_entregas": int(self.entregas["id"].nunique()),
            "num_hospitais": int(self.entregas["id_hospital"].nunique()),
            "carga_total_kg": float(self.entregas["peso_kg"].sum()),
            "km_total": float(self.resumo["distancia_km"].sum()),
            "custo_total": float(self.resumo["custo_total"].sum()),
            "tempo_total_min": float(self.resumo["tempo_min"].sum()),
        }

    def get_kpis_por_veiculo(self):
        return self.resumo.copy()
    
    def get_itinerario_por_veiculo(self, veiculo_id: str) -> dict:
        # Dados do veículo
        veiculo = (
            self.veiculos
            .query("id_veiculo == @veiculo_id")
            .iloc[0]
            .to_dict()
        )

        # Rotas ordenadas
        entregas = (
            self.rotas
            .query("veiculo_id == @veiculo_id")
            .sort_values("ordem_na_rota")
            .to_dict(orient="records")
        )

        return {
            "id_veiculo": veiculo_id,
            "veiculo": veiculo,
            "entregas": [
                {
                    "ordem": e["ordem_na_rota"],
                    "entrega_id": e["entrega_id"],
                    "hospital_id": e["hospital_id"],
                    "hospital_nome": e["hospital_nome"],
                    "prioridade": e["prioridade"],
                    "peso_kg": e["peso_kg"],
                    "tempo_entrega_min": e["tempo_entrega_min"],
                    "lat": e["lat"],
                    "lng": e["lng"],
                }
                for e in entregas
            ],
        }



# instância singleton
store = DataStore()
