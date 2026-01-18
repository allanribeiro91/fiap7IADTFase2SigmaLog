import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;

  overflow-y: auto;
  /* Firefox */
  scrollbar-width: none;

  /* Internet Explorer / Edge antigo */
  -ms-overflow-style: none;

  /* Chrome, Edge, Safari */
  &::-webkit-scrollbar {
    display: none;
  }
`;

interface Props {
  children: React.ReactNode;
}

export function ContainerItinerario({ children }: Props) {
  return <Wrapper>{children}</Wrapper>;
}
