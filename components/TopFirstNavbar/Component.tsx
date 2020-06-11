import React from 'react';
import Router from 'next/router';
import {
  Nav, LinkContainer, LinkTitle, LinksContainer,
} from '../TopSecondNavbar/Styled';
import { AvailableDurations, AvailableResourceTypes } from '../../redux/top/types';

interface Props {
  currentType: AvailableResourceTypes;
  currentDuration: AvailableDurations;
}

const Component: React.FC<Props> = ({ currentType, currentDuration }) => (
  <Nav second>
    <LinksContainer>
      <LinkContainer
        type="button"
        onClick={(): Promise<boolean> => Router.push(`/top/${currentType}/oneMonth`)}
      >
        <LinkTitle
          isLight={currentDuration === 'oneMonth'}
        >
          1 Month
        </LinkTitle>
      </LinkContainer>

      <LinkContainer
        type="button"
        onClick={(): Promise<boolean> => Router.push(`/top/${currentType}/threeMonths`)}
      >
        <LinkTitle
          isLight={currentDuration === 'threeMonths'}
        >
          3 Months
        </LinkTitle>
      </LinkContainer>

      <LinkContainer
        type="button"
        onClick={(): Promise<boolean> => Router.push(`/top/${currentType}/allTime`)}
      >
        <LinkTitle
          isLight={currentDuration === 'allTime'}
        >
          All Time
        </LinkTitle>
      </LinkContainer>
    </LinksContainer>
  </Nav>
);

export default Component;
