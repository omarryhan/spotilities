import React from 'react';
import { Container } from './Styled';

const Component: React.FC<{}> = ({ children }) => (
  <Container>
    {children}
  </Container>
);

export default Component;
