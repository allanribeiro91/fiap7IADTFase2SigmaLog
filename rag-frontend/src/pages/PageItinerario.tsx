import { ContainerSide } from "../containers/ContainerSide";
import { ContainerKpis } from "../containers/ContainerKpis";
import { ContainerItinerario } from "../containers/ContainerItinerario";
import { CardKpi } from "../components/CardKpi";
import { BoxItinerario } from "../components/BotItinerario";
import { BoxResumoExecutivo } from "../components/BoxResumoExecutivo";
import { BoxEntrega } from "../components/BoxEntrega";
import { ChatContainer } from "../components/chat/ChatContainer";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { fetchKpisGlobais, KpisGlobais } from "../services/kpiService";
import { adaptKpisGlobaisParaItinerario } from "../utils/adaptKpisGlobais";
import { fetchResumoVeiculos, ResumoVeiculo } from "../services/resumoService";
import { formatNumber } from "../utils/funcoes";
import { fetchItinerarioPorVeiculo, Itinerario } from "../services/itinerariosService";

const Page = styled.div`
  flex: 1;
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  /* padding: ${({ theme }) => theme.spacing.xs}; */

  min-height: 0;        /* 🔑 */
`;




export function PageItinerario() {

  const [kpisItinerario, setKpisItinerario] = useState<any>(null);

  useEffect(() => {
    fetchKpisGlobais()
      .then((data) => {
        const adaptado = adaptKpisGlobaisParaItinerario(data);
        setKpisItinerario(adaptado);
      })
      .catch((error) =>
        console.error("Erro ao buscar KPIs globais:", error)
      );
  }, []);

  

  const [resumos, setResumos] = useState<ResumoVeiculo[]>([]);
  useEffect(() => {
    fetchResumoVeiculos()
      .then(setResumos)
      .catch((error) =>
        console.error("Erro ao buscar resumo dos veículos:", error)
      );
  }, []);



  const [itinerarios, setItinerarios] = useState<Record<string, Itinerario>>({});
  useEffect(() => {
  if (!resumos.length) return;

  resumos.forEach((resumo) => {
      fetchItinerarioPorVeiculo(resumo.veiculo_id)
        .then((itinerario) => {
          setItinerarios((prev) => ({
            ...prev,
            [resumo.veiculo_id]: itinerario,
          }));
        })
        .catch((error) =>
          console.error(
            `Erro ao buscar itinerário do veículo ${resumo.veiculo_id}`,
            error
          )
        );
    });
  }, [resumos]);

  const formatEntregaTitle = (
    ordem: number,
    entregaId: string
  ) => `Entrega Nº ${String(ordem).padStart(2, "0")} - (ID da entrega: ${entregaId})`;


  return (
    <Page>
      <ContainerSide side="left">
        { kpisItinerario && <ContainerKpis data={kpisItinerario} /> }

        <ContainerItinerario>
          {resumos.map((resumo, index) => {
            const itinerario = itinerarios[resumo.veiculo_id];

            return (
              <BoxItinerario
                key={resumo.veiculo_id}
                title={`Veículo: ${resumo.veiculo_id}`}
                eventKey={String(index)}
              >
                <BoxResumoExecutivo
                  resumo={[
                    {
                      label: "Número de entregas",
                      value: resumo.qtd_entregas,
                    },
                    {
                      label: "Distância total",
                      value: `${resumo.distancia_km.toLocaleString("pt-BR")} km`,
                    },
                    {
                      label: "Tempo total",
                      value: `${resumo.tempo_min.toLocaleString("pt-BR")} min`,
                    },
                    {
                      label: "Custo total",
                      value: `R$ ${resumo.custo_total.toLocaleString("pt-BR")}`,
                    },
                  ]}
                />

                {itinerario ? (
                  itinerario.entregas.map((entrega) => (
                    <BoxEntrega
                      key={entrega.entrega_id}
                      title={formatEntregaTitle(
                        entrega.ordem,
                        entrega.entrega_id
                      )}
                      eventKey={`${resumo.veiculo_id}-${entrega.ordem}`}
                      details={[
                        {
                          label: "Destino",
                          value: entrega.hospital_nome,
                        },
                        {
                          label: "Prioridade",
                          value: entrega.prioridade,
                        },
                        {
                          label: "Peso",
                          value: `${entrega.peso_kg.toLocaleString("pt-BR")} kg`,
                        },
                        {
                          label: "Tempo estimado",
                          value: `${entrega.tempo_entrega_min} min`,
                        },
                      ]}
                    />
                  ))
                ) : (
                  <BoxEntrega
                    title="Carregando entregas..."
                    eventKey={`${resumo.veiculo_id}-loading`}
                    details={[]}
                  />
                )}
              </BoxItinerario>
            );
          })}
        </ContainerItinerario>

      </ContainerSide>

      <ContainerSide side="right">
        <ChatContainer />
      </ContainerSide>
    </Page>
  );
}
