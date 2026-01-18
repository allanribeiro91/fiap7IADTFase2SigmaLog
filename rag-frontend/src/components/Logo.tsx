import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-weight: 600;
  font-size: 1.1rem;
`;

const Icon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.35;
`;

const Sub = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 400;
`;

export function Logo() {
  return (
    <Wrapper>
      <Icon>Σ</Icon>
      <Text>
        Sigma Log
        <Sub>Precisão, rastreabilidade e cuidado em cada entrega</Sub>
      </Text>
    </Wrapper>
  );
}
