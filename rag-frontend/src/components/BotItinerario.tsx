import Accordion from "react-bootstrap/Accordion";
import styled from "styled-components";

const Wrapper = styled.div`
  .accordion-item {
    background: ${({ theme }) => theme.colors.surface};
    border: none;
    border-radius: ${({ theme }) => theme.radius.md};
    overflow: hidden;
  }

  .accordion-header button {
    background: ${({ theme }) => theme.colors.surfaceLight};
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
  }

  /* ESTADO ABERTO */
  .accordion-button:not(.collapsed) {
    background: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
    box-shadow: none;
  }

  /* CHEVRON */
  .accordion-button::after {
    filter: brightness(0) invert(1);
  }

  .accordion-body {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

interface Props {
  title: string;
  children: React.ReactNode;
  eventKey: string;
}

export function BoxItinerario({ title, children, eventKey }: Props) {
  return (
    <Wrapper>
      <Accordion>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Header>{title}</Accordion.Header>
          <Accordion.Body>{children}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Wrapper>
  );
}
