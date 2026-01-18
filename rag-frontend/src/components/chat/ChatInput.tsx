import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Input = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: none;
  outline: none;
`;

const Button = styled.button`
  padding: 0 ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: none;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
`;

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, disabled, placeholder }: ChatInputProps) {
  const [text, setText] = useState("");

  function send() {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  }

  return (
    <Wrapper>
      <Input
        disabled={disabled}
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
      />
      <Button onClick={send}>Enviar</Button>
    </Wrapper>
  );
}
