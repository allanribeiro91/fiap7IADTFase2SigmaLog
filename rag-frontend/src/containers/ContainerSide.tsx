import styled from "styled-components";

const Side = styled.section<{ side?: "left" | "right" }>`
  flex: ${({ side }) => (side === "right" ? "0 0 35%" : "1")};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};

  min-height: 0;        /* 🔑 */
  overflow: hidden;     /* 🔑 */
`;

interface Props {
  side?: "left" | "right";
  children: React.ReactNode;
}

export function ContainerSide({ side = "left", children }: Props) {
  return <Side side={side}>{children}</Side>;
}
