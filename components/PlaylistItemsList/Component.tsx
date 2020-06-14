import React from 'react';
import { useSelector } from 'react-redux';

import WithScrollLazyLoad from '../WithScrollLazyLoad';
import { CombinedStateType } from '../../redux/types';
import { AllPlaylistItems } from '../../redux/playlistItems/types';
import { Container } from './Styled';
import TrackStripe from '../TrackStripe';
import Skeleton from '../TrackStripe/Skeleton';

interface Props {
  playlistId: string;
  onTrackClick?: (
    trackId: string,
    playlistId: string,
    inThisListOfTracks?: string[],
  ) => any;
}

const Component: React.FC<Props> = ({ playlistId, onTrackClick }) => {
  const playlistTracks = useSelector<CombinedStateType, AllPlaylistItems>(
    (state) => state.playlistItems.data[playlistId]?.data,
  );
  const allPlaylistTrackIds = !playlistTracks ? [] : Object.keys(playlistTracks);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      {
        allPlaylistTrackIds.length
          ? (
            <WithScrollLazyLoad
              maxItems={allPlaylistTrackIds.length}
              startingItems={15}
            >
              { ({ nToRender }): ReturnType<React.FC<{}>> => (
                <>
                  {
                    (allPlaylistTrackIds.slice(0, nToRender).map((trackId) => (
                      <TrackStripe
                        key={trackId}
                        trackId={trackId}
                        playlistId={playlistId}
                        onClickHandler={onTrackClick}
                      />
                    )))
                  }
                </>
              )}
            </WithScrollLazyLoad>
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
