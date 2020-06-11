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
        onClick={(): Promise<boolean> => Router.push(`/top/tracks/${currentDuration}`)}
      >
        <LinkTitle
          isLight={currentType === 'tracks'}
        >
          Tracks
        </LinkTitle>
      </LinkContainer>

      <LinkContainer
        type="button"
        onClick={(): Promise<boolean> => Router.push(`/top/artists/${currentDuration}`)}
      >
        <LinkTitle
          isLight={currentType === 'artists'}
        >
          Artists
        </LinkTitle>
      </LinkContainer>
    </LinksContainer>
  </Nav>
);

export default Component;
