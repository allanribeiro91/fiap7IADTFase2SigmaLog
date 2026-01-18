import { useState } from "react";
import styled from "styled-components";
import { ChatTop } from "./ChatTop";
import { ChatContent } from "./ChatContent";
import { ChatInput } from "./ChatInput";
import { sendChatMessage } from "../../services/chatService";

const Wrapper = styled.section`
  flex: 1;              
  display: flex;
  flex-direction: column;

  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};

  overflow: hidden;     
  min-height: 0;        
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
`;

const Suggestions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
  max-width: 320px;
`;

const SuggestionButton = styled.button`
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: none;
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  font-size: 0.85rem;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }
`;

export type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

export const INITIAL_SUGGESTIONS = [
  "Qual é o panorama geral da operação de hoje?",
  "Quais veículos concentram maior custo ou carga?",
  "Existem entregas críticas ou de alta prioridade neste planejamento?",
  "Qual itinerário apresenta maior risco operacional?",
  "Há algum veículo ou destino que exige atenção imediata?",
];




export function ChatContainer() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      content: text,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const response = await sendChatMessage({
        question: text,
        history: nextMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      });

      const iaMessage: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: response.answer,
      };

      setMessages((prev) => [...prev, iaMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          role: "assistant",
          content:
            "Não foi possível processar a solicitação no momento.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    setMessages([]);
  }

  return (
    <Wrapper>
      <ChatTop
        onSelectSuggestion={sendMessage}
        onClear={clearChat}
      />

      {messages.length === 0 ? (
        <EmptyState>
          <h3>Olá, como posso ajudar?</h3>
          <Suggestions>
            {INITIAL_SUGGESTIONS.map((s, i) => (
              <SuggestionButton key={i} onClick={() => sendMessage(s)}>
                {s}
              </SuggestionButton>
            ))}
          </Suggestions>
        </EmptyState>
      ) : (
        <ChatContent messages={messages} />
      )}

      <ChatInput
        onSend={sendMessage}
        disabled={loading}
        placeholder={
          loading ? "Analisando dados..." : "Digite sua pergunta"
        }
      />
    </Wrapper>
  );
}

