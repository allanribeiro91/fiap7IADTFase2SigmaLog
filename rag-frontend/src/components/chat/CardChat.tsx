import styled from "styled-components";

const Bubble = styled.div<{ role: "user" | "assistant" }>`
  align-self: ${({ role }) =>
    role === "user" ? "flex-end" : "flex-start"};
  max-width: 75%;
  padding: ${({ theme }) => theme.spacing.sm}
    ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.md};
  white-space: pre-wrap;

  background: ${({ role, theme }) =>
    role === "user"
      ? theme.colors.primary
      : theme.colors.surfaceLight};

  color: ${({ role, theme }) =>
    role === "user" ? "#fff" : theme.colors.text}`;

interface Props {
  role: "user" | "assistant";
  message: string;
}

export function CardChat({ role, message }: Props) {
  return <Bubble role={role}>{message}</Bubble>;
}

