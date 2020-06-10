import React from 'react';
import { useSelector } from 'react-redux';

import LazyLoadOnScroll from '../LazyLoadOnScroll';
import { CombinedStateType } from '../../redux/types';
import { AllPlaylistItems } from '../../redux/playlistItems/types';
import { Container } from './Styled';
import TrackStripe from '../TrackStripe';
import Skeleton from '../TrackStripe/Skeleton';


const Component: React.FC<{playlistId: string}> = ({ playlistId }) => {
  const playlistTracks = useSelector<CombinedStateType, AllPlaylistItems>(
    (state) => state.playlistItems.data[playlistId]?.data,
  );
  const allPlaylistTrackIds = !playlistTracks ? [] : Object.keys(playlistTracks);

  return (
    <Container>
      {
        allPlaylistTrackIds.length
          ? (
            <LazyLoadOnScroll
              maxTracks={allPlaylistTrackIds.length}
              startingTracks={15}
            >
              { ({ nToRender }): ReturnType<React.FC<{}>> => (
                <>
                  {
                    (allPlaylistTrackIds.slice(0, nToRender).map((trackId) => (
                      <TrackStripe trackId={trackId} playlistId={playlistId} key={trackId} />
                    )))
                  }
                </>
              )}
            </LazyLoadOnScroll>
          )
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
