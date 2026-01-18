import styled from "styled-components";
import { CardChat } from "./CardChat";
import { ChatMessage } from "./ChatContainer";


const Content = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  overflow-y: auto;                 /* 🔑 */
  overscroll-behavior: contain;
  min-height: 0;                    /* 🔑 */

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.6) transparent;

  /* Chrome, Edge, Safari */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.85);
  }
`;




interface ChatContentProps {
  messages: ChatMessage[];
}

export function ChatContent({ messages }: ChatContentProps) {
  return (
    <Content>
      {messages.map((m) => (
        <CardChat
          key={m.id}
          role={m.role}
          message={m.content}
        />
      ))}
    </Content>
  );
}
