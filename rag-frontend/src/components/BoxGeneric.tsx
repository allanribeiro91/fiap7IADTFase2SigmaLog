import Accordion from "react-bootstrap/Accordion";
import styled from "styled-components";

const Wrapper = styled.div`
  .accordion-item {
    background: ${({ theme }) => theme.colors.surfaceLight};
    border: none;
    border-radius: ${({ theme }) => theme.radius.sm};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text};
    overflow: hidden;
  }

  .accordion-header button {
    background: ${({ theme }) => theme.colors.surfaceLight};
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.9rem;
    font-weight: 500;
    box-shadow: none;
  }

  .accordion-button:not(.collapsed) {
    background: #dfb7ff45;
  }

  .accordion-body {
    font-size: 0.85rem;
    line-height: 1.5;
  }
`;

interface BoxGenericProps {
  title: string;
  eventKey: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function BoxGeneric({
  title,
  eventKey,
  defaultOpen = false,
  children,
}: BoxGenericProps) {
  return (
    <Wrapper>
      <Accordion defaultActiveKey={defaultOpen ? eventKey : undefined}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Header>{title}</Accordion.Header>
          <Accordion.Body>{children}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Wrapper>
  );
}
