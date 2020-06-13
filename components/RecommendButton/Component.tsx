import React from 'react';
// @ts-ignore
import { AwesomeButton } from 'react-awesome-button';
import Wand from '../../public/icons/wand-active.svg';

import {
  IconWrapper,
} from './Styled';

const Component: React.FC<{}> = () => (
  <IconWrapper>
    <AwesomeButton type="primary">
      <Wand />
    </AwesomeButton>
  </IconWrapper>
);

export default Component;
