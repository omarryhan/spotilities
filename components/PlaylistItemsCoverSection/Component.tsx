import React from 'react';
import { ColorExtractor } from 'react-color-extractor';

import { useSelector } from 'react-redux';
import { styledComponentsTheme } from '../../configs/theme';
import { CombinedStateType } from '../../redux/types';
import { AllPlaylistItems } from '../../redux/playlistItems/types';
import { UserLibraryPlaylistId } from '../../redux/playlistItems/actions';
import { AllTracks } from '../../redux/tracks/types';
import { AllTracksFeatures } from '../../redux/tracksAudioFeatures/types';
import {
  Container,
  Slider,
  Slides,
  Slide,
  PlaylistCoverPhotoWrapper,
  PlaylistTitle,
  MetricsContainer,
  DescriptionWrapper,
  DescriptionText,
  StyledCircularProgress,
  MetricsSpinnerContainer,
  MetricsSpinnerLoadingText,
} from './Styled';

import PlaylistCoverMetricBar from '../PlaylistCoverMetricBar';
import {
  getPopularityScoreFromPlaylistTracks,
  getAudioFeaturesScoreFromPlaylistTracks,
} from '../PlaylistMetricBar/helpers';
import {
  AvailableMetrics,
  AvailableFeatures,
} from '../PlaylistMetricBar/types';

const Component: React.FC<{playlistId: string}> = ({ playlistId }) => {
  const [bgColor, setBgColor] = React.useState(styledComponentsTheme.colors.gray.dark);

  const playlistName = useSelector<CombinedStateType, string>(
    (state) => state.playlists.data[playlistId]?.name,
  );

  const playlistLength = useSelector<CombinedStateType, number>(
    (state) => state.playlists.data[playlistId]?.tracks.total,
  );

  const playlistPhotos = useSelector<CombinedStateType, string[] | undefined>(
    (state) => state.playlists.data[playlistId]?.images.map((image) => image.url),
  );

  const playlistDescription = useSelector<CombinedStateType, string | undefined>(
    // @ts-ignore
    (state) => state.playlists.data[playlistId]?.description,
  );

  const playlistTracks = useSelector<CombinedStateType, AllPlaylistItems>(
    (state) => state.playlistItems.data[playlistId]?.data || {},
  );

  const playlistTrackIds = Object.keys(playlistTracks);

  const playlistsTracks = useSelector<CombinedStateType, AllTracks>(
    (state) => {
      const keys = Object.keys(state.tracks.data).filter(
        (trackId) => playlistTrackIds.includes(trackId),
      );
      return Object.fromEntries(keys.map(
        (id) => [id, state.tracks.data[id]],
      ));
    },
  );

  const playlistAudioFeatures = useSelector<CombinedStateType, AllTracksFeatures>(
    (state) => {
      const keys = Object.keys(state.tracksAudioFeatures.data).filter(
        (trackId) => playlistTrackIds.includes(trackId),
      );

      return Object.fromEntries(keys.map((
        (id) => [id, state.tracksAudioFeatures.data[id]]
      )));
    },
  );

  const isFetchingPlaylistsItems = useSelector<CombinedStateType, boolean>(
    (state) => state.playlistItems.data[playlistId]?.status?.isFetching,
  ) as boolean | undefined;

  const backupPhotoURL = '';

  const percentageTracksLoaded = Object.keys(playlistTracks).length / playlistLength * 100;

  const setColor = (colors: string[]): void => {
    setBgColor(colors[5]);
  };

  return (
    <Container>
      <Slider>
        <Slides bgColor={bgColor}>
          <Slide bgColor={bgColor}>
            <PlaylistCoverPhotoWrapper>
              <ColorExtractor getColors={setColor}>
                { /* ColorExtractor only accepts <img>, that's why
                  we're not using a styled component */ }
                <img
                  style={{ width: '100%' }}
                  src={playlistPhotos ? playlistPhotos[0] || '/cover_art/fallback_cover_icon.png' : backupPhotoURL}
                  alt={`${playlistName} playlist cover`}
                  onError={(e): void => {
                    // @ts-expect-error
                    e.target.src = '/cover_art/fallback_cover_icon.png';
                  }}
                />
              </ColorExtractor>
            </PlaylistCoverPhotoWrapper>

            <PlaylistTitle>
              {playlistName}
            </PlaylistTitle>
          </Slide>

          {
            !playlistDescription
              ? null
              : (
                <Slide bgColor={bgColor}>
                  <DescriptionWrapper>
                    <DescriptionText>
                      {playlistDescription}
                    </DescriptionText>
                  </DescriptionWrapper>
                </Slide>
              )
          }

          <Slide bgColor={bgColor}>
            <MetricsContainer>
              {
                ([
                  'energy',
                  'danceability',
                  'valence',
                  'popularity',
                  'acousticness',
                  'instrumentalness',
                  'liveness',
                  'speechiness',
                ] as AvailableMetrics[]).map((name) => (
                  <PlaylistCoverMetricBar
                    name={name}
                    key={name}
                    percentage={name === 'popularity'
                      ? getPopularityScoreFromPlaylistTracks(playlistsTracks)
                      : getAudioFeaturesScoreFromPlaylistTracks(
                        playlistAudioFeatures, name as AvailableFeatures,
                      )}
                    isLoading={isFetchingPlaylistsItems || false}
                  />
                ))
              }
              {
                (
                  playlistId === UserLibraryPlaylistId
                  || percentageTracksLoaded === 100
                  || !isFetchingPlaylistsItems
                )
                  ? null
                  : (
                    <MetricsSpinnerContainer>
                      <MetricsSpinnerLoadingText>Loading...</MetricsSpinnerLoadingText>
                      <StyledCircularProgress variant="static" value={percentageTracksLoaded} />
                    </MetricsSpinnerContainer>
                  )
              }
            </MetricsContainer>
          </Slide>
        </Slides>
      </Slider>
    </Container>
  );
};

export default Component;
