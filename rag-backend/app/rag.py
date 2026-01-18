# app/rag.py
import re
from typing import Tuple, Dict, Any, Optional, List

from app.data import store

# Ordem sugerida para leitura/relato (não é usada para ordenar automaticamente
# porque seus dados já vêm com ordem_na_rota). Mantida para referência.
PRIORIDADE_ORDEM = ["CRITICA", "ALTA", "MEDIA", "BAIXA"]

PROMPT_BASE = """\
Você é um assistente da Sigma Log, empresa especializada em logística médica e hospitalar.

Seu público são gestores, coordenadores logísticos e equipes operacionais.
Responda de forma clara, objetiva e profissional.

REGRAS:
- Use exclusivamente as informações fornecidas no CONTEXTO.
- Não invente dados.
- Se algo não estiver no contexto, diga explicitamente o que falta.
- Ao apresentar números, explique brevemente o que eles significam.
- Priorize clareza operacional e impacto gerencial.
"""

# ---------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------
def _normalize_text(s: str) -> str:
    return (s or "").strip().upper()


def _extrair_id_numerico(texto: str) -> Optional[str]:
    """
    Extrai o primeiro número (curto ou longo) da pergunta.
    Ex.: "veículo 3", "entrega 102", "id 92392"
    Retorna string (para casar com ids string no DataStore).
    """
    if not texto:
        return None
    m = re.search(r"\b(\d{1,10})\b", texto)
    return m.group(1) if m else None


def _format_float(x: Any, nd: int = 2) -> str:
    try:
        return f"{float(x):.{nd}f}"
    except Exception:
        return str(x)


def _safe_int(x: Any, default: int = 0) -> int:
    try:
        return int(x)
    except Exception:
        return default


# ---------------------------------------------------------------------
# Context builders (alinhados ao DataStore atual)
# ---------------------------------------------------------------------
def _contexto_executivo() -> str:
    """
    Visão executiva: KPIs globais + top veículos por custo (a partir do resumo).
    """
    kpis = store.get_kpis_globais()
    resumo = store.resumo  # df com veiculo_id, distancia_km, tempo_min, custo_total, qtd_entregas

    # Top 3 por custo (se existir coluna)
    top_custo = []
    if resumo is not None and "custo_total" in resumo.columns:
        top_custo = (
            resumo.sort_values("custo_total", ascending=False)
            .head(3)[["veiculo_id", "custo_total", "distancia_km", "tempo_min", "qtd_entregas"]]
            .to_dict(orient="records")
        )

    return (
        "### Visão Executiva da Operação\n"
        f"- Veículos em operação: {_safe_int(kpis.get('num_veiculos'))}\n"
        f"- Total de entregas: {_safe_int(kpis.get('num_entregas'))}\n"
        f"- Hospitais atendidos: {_safe_int(kpis.get('num_hospitais'))}\n"
        f"- Carga total transportada (kg): {_format_float(kpis.get('carga_total_kg'), 2)}\n"
        f"- Distância total percorrida (km): {_format_float(kpis.get('km_total'), 2)}\n"
        f"- Custo total estimado (R$): {_format_float(kpis.get('custo_total'), 2)}\n"
        f"- Tempo total estimado (min): {_format_float(kpis.get('tempo_total_min'), 2)}\n\n"
        "### Veículos com maior custo (top 3)\n"
        f"{top_custo if top_custo else 'Sem dados de custo por veículo no resumo.'}\n"
    )


def _contexto_itinerario(veiculo_id: str) -> str:
    """
    Detalha o itinerário do veículo (sequência + distribuição por prioridade).
    Requer método store.get_itinerario_por_veiculo implementado no DataStore
    (ou via router) conforme o que fizemos anteriormente.
    """
    veiculo_id = str(veiculo_id)

    try:
        it = store.get_itinerario_por_veiculo(veiculo_id)
    except Exception:
        return f"Não encontrei itinerário para o veículo {veiculo_id}."

    entregas: List[Dict[str, Any]] = it.get("entregas", []) or []
    dist_prior: Dict[str, int] = {}
    for e in entregas:
        p = _normalize_text(e.get("prioridade"))
        dist_prior[p] = dist_prior.get(p, 0) + 1

    # Resumo do veículo (se disponível no df resumo)
    resumo_txt = ""
    if getattr(store, "resumo", None) is not None:
        df_resumo = store.resumo
        if df_resumo is not None and "veiculo_id" in df_resumo.columns:
            row = df_resumo[df_resumo["veiculo_id"].astype(str) == veiculo_id]
            if not row.empty:
                r = row.iloc[0].to_dict()
                resumo_txt = (
                    "### Resumo do Veículo (métricas)\n"
                    f"- Distância (km): {_format_float(r.get('distancia_km'), 2)}\n"
                    f"- Tempo (min): {_format_float(r.get('tempo_min'), 2)}\n"
                    f"- Custo (R$): {_format_float(r.get('custo_total'), 2)}\n"
                    f"- Qtde entregas: {_safe_int(r.get('qtd_entregas'))}\n\n"
                )

    seq_lines = []
    for e in entregas:
        seq_lines.append(
            f"{e.get('ordem')}. {e.get('hospital_nome')} "
            f"(prioridade: {e.get('prioridade')}, peso: {e.get('peso_kg')} kg, "
            f"tempo: {e.get('tempo_entrega_min')} min)"
        )

    return (
        f"### Itinerário do Veículo {veiculo_id}\n"
        f"- Total de entregas: {len(entregas)}\n"
        f"- Distribuição por prioridade: {dist_prior}\n\n"
        f"{resumo_txt}"
        "### Sequência de entregas (ordem na rota)\n"
        + ("\n".join(seq_lines) if seq_lines else "Sem entregas encontradas para este veículo.")
        + "\n"
    )


def _contexto_entrega(entrega_ref: str) -> str:
    """
    Busca a entrega pelo 'entrega_id' (string). Se o usuário passar um número,
    tentamos casar com entrega_id exata.

    Observação: como o DataStore atual guarda as rotas em store.rotas, é mais
    eficiente procurar lá.
    """
    entrega_ref = str(entrega_ref)

    # 1) tentar localizar diretamente nas rotas (mais completo)
    if getattr(store, "rotas", None) is not None:
        df = store.rotas
        try:
            match = df[df["entrega_id"].astype(str) == entrega_ref]
            if not match.empty:
                e = match.sort_values("ordem_na_rota").iloc[0].to_dict()

                return (
                    "### Detalhes da Entrega\n"
                    f"- Entrega ID: {e.get('entrega_id')}\n"
                    f"- Veículo: {e.get('veiculo_id')}\n"
                    f"- Ordem na rota: {e.get('ordem_na_rota')}\n"
                    f"- Hospital: {e.get('hospital_nome')} (id: {e.get('hospital_id')})\n"
                    f"- Prioridade: {e.get('prioridade')}\n"
                    f"- Peso (kg): {e.get('peso_kg')}\n"
                    f"- Tempo estimado (min): {e.get('tempo_entrega_min')}\n"
                    f"- Coordenadas: ({e.get('lat')}, {e.get('lng')})\n"
                )
        except Exception:
            pass

    # 2) fallback: procurar em entregas.csv
    if getattr(store, "entregas", None) is not None:
        df_e = store.entregas
        try:
            match = df_e[df_e["id"].astype(str) == entrega_ref]
            if not match.empty:
                e = match.iloc[0].to_dict()
                return (
                    "### Detalhes da Entrega (base de entregas)\n"
                    f"- Entrega ID: {e.get('id')}\n"
                    f"- Hospital ID: {e.get('id_hospital')}\n"
                    f"- Nome: {e.get('nome')}\n"
                    f"- Prioridade: {e.get('prioridade')}\n"
                    f"- Peso (kg): {e.get('peso_kg')}\n"
                    f"- Penalidade: {e.get('penalidade')}\n"
                    f"- Tempo estimado entrega (min): {e.get('tempo_estimado_entrega_min')}\n"
                    f"- Coordenadas: ({e.get('lat')}, {e.get('lng')})\n"
                )
        except Exception:
            pass

    return f"Não encontrei a entrega {entrega_ref} no conjunto de dados disponível."


# ---------------------------------------------------------------------
# Mode selection
# ---------------------------------------------------------------------
def escolher_modo(question: str, mode: str) -> Tuple[str, Optional[str]]:
    """
    Modos:
      - resumo: visão executiva
      - kpi: sinônimo de resumo (mantido para compat)
      - itinerario: detalha um veículo
      - entrega: detalha uma entrega
    """
    if mode and mode != "auto":
        ref = _extrair_id_numerico(question)
        return mode, ref

    q = (question or "").lower()

    # prioridade para itinerario quando usuário fala de veículo/rota
    if any(k in q for k in ["veículo", "veiculo", "rota", "itinerário", "itinerario"]):
        return "itinerario", _extrair_id_numerico(question)

    if any(k in q for k in ["entrega", "hospital", "destino"]):
        return "entrega", _extrair_id_numerico(question)

    if any(k in q for k in ["resumo", "executivo", "panorama", "geral", "visão geral", "visao geral"]):
        return "resumo", None

    if any(k in q for k in ["kpi", "indicador", "custo", "tempo total", "km total"]):
        return "kpi", None

    return "kpi", None


# ---------------------------------------------------------------------
# Public API used by main.py
# ---------------------------------------------------------------------
def build_context(question: str, mode: str) -> Tuple[str, str]:
    used_mode, ref_id = escolher_modo(question, mode)

    if used_mode in ["resumo", "kpi"]:
        ctx = _contexto_executivo()

    elif used_mode == "itinerario":
        if not ref_id:
            ctx = (
                _contexto_executivo()
                + "\nO usuário pediu detalhes de um itinerário/veículo, mas não informou o ID do veículo."
            )
        else:
            ctx = _contexto_itinerario(ref_id)

    elif used_mode == "entrega":
        if not ref_id:
            ctx = (
                _contexto_executivo()
                + "\nO usuário pediu detalhes de uma entrega, mas não informou o ID da entrega."
            )
        else:
            ctx = _contexto_entrega(ref_id)

    else:
        ctx = _contexto_executivo()

    return used_mode, ctx


def context_preview(ctx: str, limit: int = 900) -> str:
    ctx = (ctx or "").strip()
    return ctx if len(ctx) <= limit else ctx[:limit] + "..."
