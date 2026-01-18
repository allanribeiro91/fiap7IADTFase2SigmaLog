const API_URL = "http://localhost:8000";

export function getMapaRotasUrl(): string {
  return `${API_URL}/static/mapa_rotas_vrp.html`;
}
