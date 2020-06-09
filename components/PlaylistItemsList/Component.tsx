import React from 'react';
import { useSelector } from 'react-redux';
import { CombinedStateType } from '../../redux/types';
import { AllPlaylistItems } from '../../redux/playlistItems/types';
import { Container } from './Styled';
import TrackStripe from '../TrackStripe';


const Component: React.FC<{playlistId: string}> = ({ playlistId }) => {
  const playlistTracks = useSelector<CombinedStateType, AllPlaylistItems>(
    (state) => state.playlistItems.data[playlistId]?.data,
  );

  const playlistTrackIds = !playlistTracks ? [] : Object.keys(playlistTracks);

  return (
    <Container>
      {
        playlistTrackIds.map((trackId) => (
          <TrackStripe trackId={trackId} playlistId={playlistId} key={trackId} />
        ))
      }
    </Container>
  );
};

export default Component;
