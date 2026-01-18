// adapters/kpisAdapter.ts
import { KpisGlobais } from "../services/kpiService";
import { formatNumeroBR, getHojeFormatado } from "./funcoes";

export function adaptKpisGlobaisParaItinerario(kpis: KpisGlobais) {
  return {
    data: getHojeFormatado(),
    kpis: {
      Entregas: kpis.num_entregas,
      Veículos: kpis.num_veiculos,
      "Km Total": formatNumeroBR(kpis.km_total, 0),
        "Carga total (kg)": formatNumeroBR(kpis.carga_total_kg, 0),
        "Custo total R$": formatNumeroBR(kpis.custo_total, 0),
    },
  };
}
