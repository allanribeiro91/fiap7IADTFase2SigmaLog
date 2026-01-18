import styled from "styled-components";
import { Logo } from "../components/Logo";
import { Tabs, TabKey } from "../components/Tabs";

const TopBar = styled.header`
  height: 64px;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

interface Props {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export function LTopBar({ activeTab, onTabChange }: Props) {
  return (
    <TopBar>
      <Logo />
      <Tabs activeTab={activeTab} onChange={onTabChange} />
    </TopBar>
  );
}
