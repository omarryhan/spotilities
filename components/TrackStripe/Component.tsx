import React from 'react';
import { useSelector } from 'react-redux';
import { CombinedStateType } from '../../redux/types';
import { Container } from './Styled';


const Component: React.FC<{trackId: string}> = ({ trackId }) => {
  const trackName = useSelector<CombinedStateType, string | undefined>(
    (state) => state.tracks.data[trackId]?.data?.name,
  );

  return (
    <Container>
      {trackName}
    </Container>
  );
};

export default Component;
