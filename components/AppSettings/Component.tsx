import React from 'react';
import { version } from '../../package.json';
import {
  Container,
  Version,
} from './Styled';


const Component: React.FC<{}> = () => (
  <Container>
    <Version>
      Version:
      {' '}
      {version}
    </Version>
  </Container>
);

export default Component;
