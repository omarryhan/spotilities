import React from 'react';
import Router from 'next/router';
import {
  Nav, LinkContainer, LinkTitle, LinksContainer,
} from './Styled';
import { AvailableDurations, AvailableResourceTypes } from '../../redux/top/types';

interface Props {
  currentType: AvailableResourceTypes;
  currentDuration: AvailableDurations;
}

const Component: React.FC<Props> = ({ currentType, currentDuration }) => (
  <Nav>
    <LinksContainer>
      <LinkContainer
        type="button"
        onClick={(): Promise<boolean> => Router.push(`/top/${currentType}/onemonth`)}
      >
        <LinkTitle
          isLight={currentDuration === 'onemonth'}
        >
          1 Month
        </LinkTitle>
      </LinkContainer>

      <LinkContainer
        type="button"
        onClick={(): Promise<boolean> => Router.push(`/top/${currentType}/threemonths`)}
      >
        <LinkTitle
          isLight={currentDuration === 'threemonths'}
        >
          3 Months
        </LinkTitle>
      </LinkContainer>

      <LinkContainer
        type="button"
        onClick={(): Promise<boolean> => Router.push(`/top/${currentType}/alltime`)}
      >
        <LinkTitle
          isLight={currentDuration === 'alltime'}
        >
          All Time
        </LinkTitle>
      </LinkContainer>
    </LinksContainer>
  </Nav>
);

export default Component;
