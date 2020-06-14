import React from 'react';
import Router from 'next/router';

import {
  Container,
  GetStartedButtonWrapper,
  GetStartedButton,
  IllustrationWrapper,
  Title,
} from './Styled';

import Magic from '../../public/icons/wizard.svg';

const Component: React.FC<{}> = () => (
  <Container>
    <IllustrationWrapper>
      <Magic />
    </IllustrationWrapper>

    <Title>
      Let&apos;s find you some music!
    </Title>

    <GetStartedButtonWrapper>
      <GetStartedButton onClick={() => Router.push('/recommend/select/seed-tracks')}>
        Start
      </GetStartedButton>
    </GetStartedButtonWrapper>
  </Container>
);

export default Component;
