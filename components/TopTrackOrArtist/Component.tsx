import React from 'react';
import Link from 'next/link';
import { Nav, StyledLink } from './Styled';
import { AvailableDurations, AvailableResourceTypes } from '../../redux/top/types';

interface Props {
  currentType: AvailableResourceTypes;
  currentDuration: AvailableDurations;
}

const Component: React.FC<Props> = ({ currentType, currentDuration }) => (
  <Nav>
    <Link
      href={`/top/tracks/${currentDuration}`}
    >
      <StyledLink
        isActive={currentType === 'tracks'}
      >
        Tracks
      </StyledLink>
    </Link>

    <Link
      href={`/top/artists/${currentDuration}`}
    >
      <StyledLink
        isActive={currentType === 'artists'}
      >
        Artists
      </StyledLink>
    </Link>
  </Nav>
);

export default Component;
