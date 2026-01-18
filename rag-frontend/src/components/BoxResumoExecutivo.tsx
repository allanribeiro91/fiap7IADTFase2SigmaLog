import styled from "styled-components";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

const Title = styled.h4`
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  font-size: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: ${({ theme }) => theme.spacing.sm};
`;

interface LineProps {
  label: string;
  value: string | number;
}

function TextLine({ label, value }: LineProps) {
  return (
    <div>
      <strong>{label}:</strong> {value}
    </div>
  );
}

interface Props {
  resumo: LineProps[];
}

export function BoxResumoExecutivo({ resumo }: Props) {
  return (
    <Wrapper>
      <Title>Resumo executivo</Title>
      <Grid>
        {resumo.map((item, idx) => (
          <TextLine key={idx} {...item} />
        ))}
      </Grid>
    </Wrapper>
  );
}
