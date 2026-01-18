import folium
from pathlib import Path
from typing import List

from src.models.base_default import BASE_PADRAO
from src.models.models import Rota


def gerar_mapa_rotas_vrp(
    rotas: List[Rota],
    lista_paths: List[str] | str | None = None,
    salvar_arquivo: bool = True,
) -> folium.Map:
    """
    Gera um mapa Folium com as rotas do VRP.

    - Cada veículo em uma camada separada
    - Paradas numeradas visualmente
    - Popup rico com informações completas da entrega
    """

    # Centraliza o mapa na base
    base_lat, base_lng = BASE_PADRAO.localizacao
    mapa = folium.Map(location=[base_lat, base_lng], zoom_start=11)

    # ---------- BASE ----------
    folium.Marker(
        location=[base_lat, base_lng],
        popup=f"<b>{BASE_PADRAO.nome}</b>",
        tooltip=BASE_PADRAO.nome,
        icon=folium.Icon(color="red", icon="home", prefix="fa"),
    ).add_to(mapa)

    # Paleta de cores
    cores = [
        "red", "blue", "green", "purple", "orange",
        "darkred", "darkgreen", "cadetblue", "darkblue", "black"
    ]

    # ---------- ROTAS POR VEÍCULO ----------
    for idx_veic, rota in enumerate(rotas):
        veiculo_id = str(rota.veiculo.id_veiculo)
        cor = cores[idx_veic % len(cores)]

        fg = folium.FeatureGroup(
            name=f"Veículo {veiculo_id}",
            show=(idx_veic == 0),
        )

        # Linha da rota
        folium.PolyLine(
            locations=[(lat, lng) for lat, lng in rota.sequencia],
            color=cor,
            weight=4,
            opacity=0.8,
            tooltip=f"Rota do veículo {veiculo_id}",
        ).add_to(fg)

        # ---------- PARADAS ----------
        for ordem, (entrega, (lat, lng)) in enumerate(
            zip(rota.entregas, rota.sequencia[1:-1]), start=1
        ):
            popup_html = f"""
            <b>Veículo:</b> {veiculo_id}<br>
            <b>Parada:</b> {ordem}<br>
            <b>Hospital:</b> {entrega.nome}<br>
            <b>Prioridade:</b> {entrega.prioridade.name}<br>
            <b>Peso (kg):</b> {entrega.peso_kg:.2f}<br>
            <b>Tempo estimado (min):</b> {entrega.tempo_estimado_entrega_min}<br>
            <b>Latitude:</b> {lat:.6f}<br>
            <b>Longitude:</b> {lng:.6f}
            """

            # Marcador com número (DivIcon)
            folium.Marker(
                location=[lat, lng],
                icon=folium.DivIcon(
                    html=f"""
                    <div style="
                        background-color:{cor};
                        color:white;
                        border-radius:50%;
                        width:26px;
                        height:26px;
                        text-align:center;
                        font-size:13px;
                        font-weight:bold;
                        line-height:26px;
                        border:2px solid white;
                    ">
                        {ordem}
                    </div>
                    """
                ),
                popup=popup_html,
                tooltip=f"{veiculo_id} – parada {ordem}",
            ).add_to(fg)

        fg.add_to(mapa)

    folium.LayerControl(collapsed=False).add_to(mapa)

    # ---------- SALVAR ----------
    if salvar_arquivo and lista_paths:
        for caminho_str in lista_paths:
            caminho = Path(caminho_str)
            caminho.parent.mkdir(parents=True, exist_ok=True)
            mapa.save(str(caminho))
            print(f"Mapa das rotas VRP gerado em: {caminho}")
    return mapa
