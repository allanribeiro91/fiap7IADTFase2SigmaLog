// types/Itinerario.ts

export interface EntregaItinerario {
  ordem: number;
  entrega_id: string;
  hospital_id: string;
  hospital_nome: string;
  prioridade: string;
  peso_kg: number;
  tempo_entrega_min: number;
  lat: number;
  lng: number;
}

export interface VeiculoItinerario {
  capacidade_kg: number;
  autonomia_km: number;
  velocidade_media_kmh: number;
  custo_por_km: number;
}

export interface Itinerario {
  id_veiculo: string;
  veiculo: VeiculoItinerario;
  entregas: EntregaItinerario[];
}

const API_URL = "http://localhost:8000";

/**
 * Retorna todos os itinerários (um por veículo)
 */
export async function fetchItinerarios() {
  const response = await fetch(`${API_URL}/itinerarios`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Erro ao buscar itinerários");
  }

  return response.json();
}

/**
 * Retorna o itinerário de um veículo específico
 */
export async function fetchItinerarioPorVeiculo(
  veiculoId: string
) {
  const response = await fetch(`${API_URL}/itinerarios/${veiculoId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.detail || `Erro ao buscar itinerário do veículo ${veiculoId}`
    );
  }

  return response.json();
}
