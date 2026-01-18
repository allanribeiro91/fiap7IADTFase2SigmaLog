import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;          /* 🔑 limita o frame */
  display: flex;
  flex-direction: column;
  overflow: hidden;       /* 🔑 mata scroll global */
`;


interface Props {
  children: React.ReactNode;
}

export function LContainer({ children }: Props) {
  return <Wrapper>{children}</Wrapper>;
}
