import React from 'react';
import { useDispatch } from 'react-redux';
import Router from 'next/router';

import {
  Container,
  GetStartedButtonWrapper,
  GetStartedButton,
  IllustrationWrapper,
  Title,
} from './Styled';

import { clearRecommendationsInput } from '../../redux/recommendations/actions';

import Magic from '../../public/icons/wizard.svg';

const Component: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <Container>
      <IllustrationWrapper>
        <Magic />
      </IllustrationWrapper>

      <Title>
        Let&apos;s find you some good music!
      </Title>

      <GetStartedButtonWrapper>
        <GetStartedButton onClick={(): void => {
          dispatch(clearRecommendationsInput());
          Router.push('/recommend/select/seed-tracks');
        }}
        >
          Start
        </GetStartedButton>
      </GetStartedButtonWrapper>
    </Container>
  );
};

export default Component;
