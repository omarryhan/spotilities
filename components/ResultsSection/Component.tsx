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

  // const seedTracksIDs = useSelector<CombinedStateType, string[]>(
  //   (state) => state.recommendations.seedTracks,
  // );
  // const tracks = useSelector<CombinedStateType, {[key: string]: Track}>(
  //   (state) => state.tracks.data,
  // );
  // const seedTracksTitles = seedTracksIDs.map((seedTrackId) => {
  //   const track = tracks[seedTrackId];
  //   const artistNames = track.data.artists.map((artist) => artist.name).join(' & ');
  //   return `${track.data.name}-${artistNames}-${track.data.album.name}`;
  // });
  // const playlistDescription = `Seed tracks: ${seedTracksTitles.join(' | ')}`;

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchRecommendations());
  }, [dispatch]);

  const createNewPlaylist = async (): Promise<void> => {
    const playlistName = prompt(
      'Please give your playlist a name',
      'New Spotilities Playlist',
    );
    dispatch(createUserPlaylist(
      {
        name: playlistName as string,
        // description: playlistDescription,
        description: 'Created by Spotilities',
        trackIds: trackIdsResults,
      },
    ));
  };

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
                <strong>
                  {trackIdsResults.length}
                </strong>
                {' '}
                recommendations
              </Title>
              <AddToPlaylistButton onClick={createNewPlaylist}>
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
