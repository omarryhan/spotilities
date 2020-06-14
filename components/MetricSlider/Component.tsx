import React from 'react';

import {
  Container,
} from './Styled';

interface Props {
  name: string;
}

const Component: React.FC<Props> = ({ name }) => (
  <Container>
    {name}
  </Container>
);

export default Component;
