import styled from "styled-components";
import { CardKpi } from "../components/CardKpi";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Title = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.sm};
`;

const DateEmphasis = styled.strong`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.sm};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

type KpisData = {
  data: string;
  kpis: Record<string, string | number>;
};

interface ContainerKpisProps {
  data: KpisData;
}

export function ContainerKpis({ data }: ContainerKpisProps) {
  return (
    <Wrapper>
      <Title>
        Itinerário de <DateEmphasis>{data.data}</DateEmphasis>
      </Title>

      <Grid>
        {Object.entries(data.kpis).map(([label, value]) => (
          <CardKpi key={label} label={label} value={value} />
        ))}
      </Grid>
    </Wrapper>
  );
}