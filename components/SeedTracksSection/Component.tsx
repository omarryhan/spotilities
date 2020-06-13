import React from 'react';
import WithDropDownMenu from '../WithDropdownMenu';

import {
  Container,
} from './Styled';

const Component: React.FC<{}> = () => (
  <WithDropDownMenu title="Seed tracks">
    <Container>
      track
      <br />
      another track
    </Container>
  </WithDropDownMenu>
);

export default Component;
