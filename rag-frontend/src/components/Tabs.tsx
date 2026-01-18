import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Tab = styled.button<{ active?: boolean }>`
  padding: ${({ theme }) => theme.spacing.xs}
    ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: none;
  cursor: pointer;
  background: ${({ active, theme }) =>
    active ? theme.colors.primary : "transparent"};
  color: ${({ active, theme }) =>
    active ? "#fff" : theme.colors.text};
  font-size: 0.9rem;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceLight};
  }
`;

export type TabKey = "itinerario" | "sobre" | "mapa";

interface Props {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
}

export function Tabs({ activeTab, onChange }: Props) {
  return (
    <Wrapper>
      <Tab
        active={activeTab === "itinerario"}
        onClick={() => onChange("itinerario")}
      >
        Itinerário Diário
      </Tab>

      <Tab
        active={activeTab === "mapa"}
        onClick={() => onChange("mapa")}
      >
        Mapa
      </Tab>

      <Tab
        active={activeTab === "sobre"}
        onClick={() => onChange("sobre")}
      >
        Sobre o Projeto
      </Tab>
    </Wrapper>
  );
}
