// types/KpisGlobais.ts
export interface KpisGlobais {
  num_veiculos: number;
  num_entregas: number;
  num_hospitais: number;
  carga_total_kg: number;
  km_total: number;
  custo_total: number;
  tempo_total_min: number;
}

// services/kpisService.ts
const API_URL = "http://localhost:8000";

export async function fetchKpisGlobais() {
  const response = await fetch(`${API_URL}/resumo/kpis`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Erro ao buscar KPIs globais");
  }

  return response.json();
}
