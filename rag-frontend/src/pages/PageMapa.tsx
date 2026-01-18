import styled from "styled-components";
import { BoxGeneric } from "../components/BoxGeneric";
import { getMapaRotasUrl } from "../services/mapaService";

export const Page = styled.div`
  flex: 1;
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xs};
  min-height: 0;
`;

const MapaWrapper = styled.div`
  width: 100%;
  height: 100%; /* ajuste fino se quiser */
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;




export function PageMapa() {
  const mapaUrl = getMapaRotasUrl();

  return (
    <Page>

        <MapaWrapper>
          <iframe
            src={mapaUrl}
            title="Mapa de Rotas"
            loading="lazy"
          />
        </MapaWrapper>

    </Page>
  );
}
