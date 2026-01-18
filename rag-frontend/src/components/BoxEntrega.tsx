import Accordion from "react-bootstrap/Accordion";
import styled from "styled-components";

const Wrapper = styled.div`
  .accordion-item {
    background: ${({ theme }) => theme.colors.surfaceLight};
    border: none;
    border-radius: ${({ theme }) => theme.radius.sm};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text};
  }

  .accordion-header button {
    background: ${({ theme }) => theme.colors.surfaceLight};
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.9rem;
  }

  .accordion-button:not(.collapsed) {
    background: #dfb7ff45;
    /* color: black; */
  }

  .accordion-body {
    font-size: 0.85rem;
  }
`;

interface Line {
  label: string;
  value: string | number;
}

interface Props {
  title: string;
  details: Line[];
  eventKey: string;
}

export function BoxEntrega({ title, details, eventKey }: Props) {
  return (
    <Wrapper>
      <Accordion>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Header>{title}</Accordion.Header>
          <Accordion.Body>
            {details.map((d, i) => (
              <div key={i}>
                <strong>{d.label}:</strong> {d.value}
              </div>
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Wrapper>
  );
}
