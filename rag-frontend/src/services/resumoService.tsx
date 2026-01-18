export interface ResumoVeiculo {
  veiculo_id: string;
  distancia_km: number;
  tempo_min: number;
  custo_total: number;
  qtd_entregas: number;
}

const API_URL = "http://localhost:8000";

export async function fetchResumoVeiculos() {
  const response = await fetch(`${API_URL}/resumo`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.detail || "Erro ao buscar resumo dos veículos"
    );
  }

  return response.json();
}
