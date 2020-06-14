import React from 'react';
import {
  Container,
  Button,
} from './Styled';

interface Props extends React.HTMLProps<HTMLButtonElement>{
  text?: string;
}

const Component: React.FC<Props> = ({ text, onClick, disabled }) => (
  <Container>
    <Button type="submit" onClick={onClick} disabled={disabled}>
      {text || 'Next'}
    </Button>
  </Container>
);

export default Component;
