import styled from "styled-components";

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const Label = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.muted};
`;

const Value = styled.span`
  font-size: 1.8rem;
  font-weight: 600;
  text-align: right;
`;

interface Props {
  label: string;
  value: string | number;
}

export function CardKpi({ label, value }: Props) {
  return (
    <Card>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Card>
  );
}
