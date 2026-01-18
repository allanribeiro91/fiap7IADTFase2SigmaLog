import styled from "styled-components";

const Workspace = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  width: 100%;

  min-height: 0;        /* 🔑 ESSENCIAL */
  overflow: hidden;     /* 🔑 trava scroll global */
`;
interface Props {
  children: React.ReactNode;
}

export function LWorkspace({ children }: Props) {
  return <Workspace>{children}</Workspace>;
}
