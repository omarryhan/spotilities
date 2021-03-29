import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CombinedStateType } from '../../redux/types';
import { getOrSetAndGetCurrentSettings } from '../../utils';
import {
  Container,
  Button,
  ImageSection,
  TitleSection,
  Name,
  LeftSection,
  ArtistAndAlbumName,
  RightSection,
  Img,
  MoreText,
} from './Styled';
import { playTrackInPlaylist } from '../../redux/playback/actions';
import StatsForMusicians from '../StatsForMusicians';
import PlaylistMetricBar from '../PlaylistMetricBar';
import {
  AvailableMetrics,
} from '../PlaylistMetricBar/types';

const featuresAvailable = [
  'energy',
  'danceability',
  'valence',
  'popularity',
] as AvailableMetrics[];

interface FeaturesMap {
  energy: number;
  danceability: number;
  valence: number;
  popularity: number;
}

interface Props {
  trackId: string;
  playlistId?: string;
  notClickable?: boolean;
  onClickHandler?: (
    trackId: string,
    playlistId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => any;
  hideMetrics?: boolean;
  hideMusiciansInfo?: boolean;
}

// const seperator = '⬤';

const Component: React.FC<Props> = ({
  trackId,
  playlistId,
  onClickHandler,
  notClickable,
  hideMetrics,
  hideMusiciansInfo,
}) => {
  const dispatch = useDispatch();

  const trackName = useSelector<CombinedStateType, string | undefined>(
    (state) => state.tracks.data[trackId]?.data?.name,
  );

  const artistName = useSelector<CombinedStateType, string | undefined>(
    (state) => state.tracks.data[trackId]?.data?.artists[0].name,
  );

  const albumName = useSelector<CombinedStateType, string | undefined>(
    (state) => state.tracks.data[trackId]?.data?.album.name,
  );

  const albumYear = useSelector<CombinedStateType, string>(
    // @ts-expect-error
    (state) => state.tracks.data[trackId]?.data?.album.release_date,
  );

  const trackImage = useSelector<CombinedStateType, string | undefined>(
    (state) => state.tracks.data[trackId]?.data?.album.images[0]?.url,
  );

  const popularity = useSelector<CombinedStateType, number | undefined>(
    (state) => state.tracks.data[trackId]?.data?.popularity,
  );

  const danceability = useSelector<CombinedStateType, number | undefined>(
    (state) => state.tracksAudioFeatures.data[trackId]?.data?.danceability,
  );

  const energy = useSelector<CombinedStateType, number | undefined>(
    (state) => state.tracksAudioFeatures.data[trackId]?.data?.energy,
  );

  const valence = useSelector<CombinedStateType, number | undefined>(
    (state) => state.tracksAudioFeatures.data[trackId]?.data?.valence,
  );

  const percentagePopularity = popularity || 0;
  const percentageDanceability = danceability ? danceability * 100 : 0;
  const percentageEnergy = energy ? energy * 100 : 0;
  const percentageValence = valence ? valence * 100 : 0;

  const featuresMap: FeaturesMap = {
    valence: percentageValence,
    energy: percentageEnergy,
    danceability: percentageDanceability,
    popularity: percentagePopularity,
  };

  let showStatsForMusicians = getOrSetAndGetCurrentSettings().showMusicianStats;

  showStatsForMusicians = typeof hideMusiciansInfo !== 'undefined' ? !hideMusiciansInfo : showStatsForMusicians;

  let { showTrackMetrics } = getOrSetAndGetCurrentSettings();

  showTrackMetrics = typeof hideMetrics !== 'undefined' ? !hideMetrics : showTrackMetrics;

  return (
    <Button
      onClick={(): void => {
        onClickHandler
          ? onClickHandler(trackId, playlistId || '')
          : dispatch(playTrackInPlaylist({ trackId, playlistId: playlistId as string }));
      }}
      longLength={showStatsForMusicians}
      type="button"
      notClickable={notClickable}
    >
      <Container>
        <LeftSection fullWidth={!showTrackMetrics}>
          <ImageSection
            longLength={showStatsForMusicians}
          >
            <Img
              longLength={showStatsForMusicians}
              src={trackImage || '/cover_art/fallback_cover_icon.png'}
              alt="Track album cover"
              onError={(e): void => {
                // @ts-expect-error
                e.target.src = '/cover_art/fallback_cover_icon.png';
              }}
            />
          </ImageSection>

          <TitleSection>
            <Name>
              {trackName}
            </Name>

            <ArtistAndAlbumName>
              {`${artistName} - ${albumName} ${albumYear ? `- ${albumYear.substring(0, 4)}` : ''}`}
            </ArtistAndAlbumName>

            {
              !showStatsForMusicians
                ? null
                : (
                  <MoreText>
                    <StatsForMusicians trackId={trackId} />
                  </MoreText>
                )
            }
          </TitleSection>
        </LeftSection>
        {
          !showTrackMetrics
            ? null
            : (
              <RightSection>
                {
                  (featuresAvailable).map((feature) => (
                    <PlaylistMetricBar
                      name={feature}
                      key={feature[0]}
                      percentageHeight={featuresMap[feature as 'danceability' | 'energy' | 'valence' | 'popularity']}
                    />
                  ))
                }
              </RightSection>
            )
        }
      </Container>
    </Button>
  );
};

export default Component;
