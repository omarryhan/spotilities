import React from 'react';
import { useSelector } from 'react-redux';
import { CombinedStateType } from '../../redux/types';
import { AllPlaylistItems } from '../../redux/playlistItems/types';
import { Container } from './Styled';
import TrackStripe from '../TrackStripe';
import Skeleton from '../TrackStripe/Skeleton';


const Component: React.FC<{playlistId: string}> = ({ playlistId }) => {
  const playlistTracks = useSelector<CombinedStateType, AllPlaylistItems>(
    (state) => state.playlistItems.data[playlistId]?.data,
  );

  const playlistTrackIds = !playlistTracks ? [] : Object.keys(playlistTracks);

  return (
    <Container>
      {
        playlistTrackIds.length
          ? playlistTrackIds.map((trackId) => (
            <TrackStripe trackId={trackId} playlistId={playlistId} key={trackId} />
          ))
          : (
            Array(8).fill('_').map((_, i) => (
              <Skeleton key={`${String(i)}-Skeleton`} />
            ))
          )
      }
    </Container>
  );
};

export default Component;
