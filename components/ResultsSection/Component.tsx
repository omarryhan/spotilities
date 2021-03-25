import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TrackStripe from '../TrackStripe';
import Skeleton from '../TrackStripe/Skeleton';
import AddToPlaylistIcon from '../../public/icons/add_to_playlist.svg';

import { playTrackURIS } from '../../redux/playback/actions';
import {
  Container,
  Title,
  TracksContainer,
  TitleContainer,
  AddToPlaylistButton,
} from './Styled';
import {
  createUserPlaylist,
} from '../../redux/playlists/actions';
import { fetchRecommendations } from '../../redux/recommendations/actions';
import { CombinedStateType } from '../../redux/types';

const Component: React.FC = () => {
  const isFetchingResults = useSelector<CombinedStateType, boolean>(
    (state) => state.recommendations.status.isFetching,
  );

  const trackIdsResults = useSelector<CombinedStateType, string[]>(
    (state) => state.recommendations.results.trackIds,
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchRecommendations());
  }, [dispatch]);

  return (
    <Container>
      {isFetchingResults
        ? (
          <>
            <TitleContainer>
              <Title>
                Applying magic...
              </Title>
            </TitleContainer>
            {
              Array(16).fill('_').map((_, i) => (
                <Skeleton key={`${String(i)}-Skeleton`} />
              ))
            }
          </>
        )
        : (
          <>
            <TitleContainer>
              <Title>
                Found
                {' '}
                {trackIdsResults.length}
                {' '}
                recommendations
              </Title>
              <AddToPlaylistButton onClick={async (): Promise<void> => {
                const playlistName = prompt(
                  'Please enter a name for your playlist',
                  'New Spotilities Playlist',
                );
                dispatch(createUserPlaylist(
                  { name: playlistName as string, trackIds: trackIdsResults },
                ));
              }}
              >
                <AddToPlaylistIcon />
              </AddToPlaylistButton>
            </TitleContainer>
            <TracksContainer>
              {
                trackIdsResults.map((trackId) => (
                  <TrackStripe
                    key={trackId}
                    trackId={trackId}
                    onClickHandler={(trackIdClicked, _): void => {
                      dispatch(playTrackURIS({
                        trackId: trackIdClicked,
                        trackURIs: trackIdsResults,
                        shufflePlay: false,
                      }));
                    }}
                  />
                ))
              }
            </TracksContainer>
          </>
        )}
    </Container>
  );
};

export default Component;
