export function getHojeFormatado(): string {
  const hoje = new Date();
  return hoje.toLocaleDateString("pt-BR");
}

export function formatNumeroBR(
  valor: number,
  casasDecimais: number = 0
): string {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: casasDecimais,
    maximumFractionDigits: casasDecimais,
  });
}

export const formatNumber = (value: number, unit?: string) =>
  `${value.toLocaleString("pt-BR")}${unit ? ` ${unit}` : ""}`;
