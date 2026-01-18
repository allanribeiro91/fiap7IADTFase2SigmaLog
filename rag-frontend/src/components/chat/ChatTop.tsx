import { useState } from "react";
import styled from "styled-components";
import { INITIAL_SUGGESTIONS } from "./ChatContainer";

const Top = styled.div`
  height: 56px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.surfaceLight};
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-weight: 500;
`;

const Menu = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-size: 1.1rem;
`;

const Suggestions = styled.div`
  position: absolute;
  top: 56px;
  right: ${({ theme }) => theme.spacing.md};
  width: 280px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  padding: ${({ theme }) => theme.spacing.sm};
  z-index: 10;
`;

const SuggestionItem = styled.button`
  width: 100%;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  font-size: 0.85rem;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceLight};
  }
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: ${({ theme }) => theme.spacing.xs} 0;
`;

const DangerItem = styled(SuggestionItem)`
  color: ${({ theme }) => theme.colors.error};

  &:hover {
    background: rgba(255, 0, 0, 0.1);
  }
`;


interface ChatTopProps {
  onSelectSuggestion: (text: string) => void;
  onClear: () => void;
}


export function ChatTop({ onSelectSuggestion, onClear }: ChatTopProps) {
  const [open, setOpen] = useState(false);

  function handleSelect(text: string) {
    onSelectSuggestion(text);
    setOpen(false);
  }

  function handleClear() {
    onClear();
    setOpen(false);
  }

  return (
    <Top>
      <Logo>
        🤖 <span>SigmIA</span>
      </Logo>

      <Menu onClick={() => setOpen((v) => !v)} title="Opções">
        ☰
      </Menu>

      {open && (
        <Suggestions>
          {INITIAL_SUGGESTIONS.map((s, i) => (
            <SuggestionItem key={i} onClick={() => handleSelect(s)}>
              {s}
            </SuggestionItem>
          ))}

          <Divider />

          <DangerItem onClick={handleClear}>
            🔄 Recomeçar conversa
          </DangerItem>
        </Suggestions>
      )}
    </Top>
  );
}
