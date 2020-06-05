import React from 'react';
import { useSelector } from 'react-redux';
import { CombinedStateType } from '../../redux/types';
import {
  MetricBar,
  Container,
  Metric,
  IconWrapper,
  MetricWrapper,
  MetricBarBackground,
} from './Styled';

import DanceabilityIcon from '../../public/icons/dance.svg';
import EnergyIcon from '../../public/icons/flash.svg';
import ValenceIcon from '../../public/icons/happy.svg';
import PopularityIcon from '../../public/icons/trending.svg';

import { AllTracks } from '../../redux/tracks/types';
import { AllTracksFeatures } from '../../redux/tracksAudioFeatures/types';

const getAudioFeaturesFromPlaylistTracks = (
  tracksAudioFeatures: AllTracksFeatures,
  feature: 'valence' | 'energy' | 'danceability',
): number => {
  const keys = Object.keys(tracksAudioFeatures);

  const numbers = keys.map((key) => {
    if (tracksAudioFeatures[key].data) {
      return tracksAudioFeatures[key].data[feature];
    } else {
      return undefined;
    }
  });

  const filteredNumbers = numbers.filter((num) => typeof num !== 'undefined') as number[];
  const tracksLength = Object.keys(filteredNumbers).length;

  const result = (
    filteredNumbers.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    / tracksLength
  );

  return result * 100;
};

const getPopularityFromPlaylistTracks = (playlistTracks: AllTracks): number => {
  const keys = Object.keys(playlistTracks);

  const numbers = keys.map((key) => {
    if (playlistTracks[key].data) {
      return playlistTracks[key].data.popularity;
    } else {
      return undefined;
    }
  });

  const filteredNumbers = numbers.filter((num) => typeof num !== 'undefined') as number[];
  const tracksLength = Object.keys(filteredNumbers).length;

  return (
    filteredNumbers.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    / tracksLength
  );
};


const Component: React.FC<{trackIds: string[]}> = ({ trackIds }) => {
  const allTracks = useSelector<CombinedStateType, AllTracks>(
    (state) => state.tracks.data,
  );
  const allAudioFeatures = useSelector<CombinedStateType, AllTracksFeatures>(
    (state) => state.tracksAudioFeatures.data,
  );
  const playlistsTracksIds = Object.keys(allTracks).filter(
    (trackId) => trackIds.includes(trackId),
  );
  const playlistsTracks = Object.fromEntries(playlistsTracksIds.map(
    (id) => [id, allTracks[id]],
  ));
  const playlistAudioFeaturesTrackIds = Object.keys(allAudioFeatures).filter(
    (trackId) => trackIds.includes(trackId),
  );
  const playlistAudioFeatures = Object.fromEntries(playlistAudioFeaturesTrackIds.map((
    (id) => [id, allAudioFeatures[id]]
  )));

  return (
    <Container>
      <Metric>
        <MetricWrapper>
          <MetricBarBackground>

            <MetricBar percentageHeight={getAudioFeaturesFromPlaylistTracks(playlistAudioFeatures, 'energy')} />
          </MetricBarBackground>
        </MetricWrapper>
        <IconWrapper>
          <EnergyIcon />
        </IconWrapper>
      </Metric>
      <Metric>
        <MetricWrapper>
          <MetricBarBackground>
            <MetricBar percentageHeight={getAudioFeaturesFromPlaylistTracks(playlistAudioFeatures, 'danceability')} />
          </MetricBarBackground>
        </MetricWrapper>
        <IconWrapper>
          <DanceabilityIcon />
        </IconWrapper>
      </Metric>
      <Metric>
        <MetricWrapper>
          <MetricBarBackground>
            <MetricBar percentageHeight={getAudioFeaturesFromPlaylistTracks(playlistAudioFeatures, 'valence')} />
          </MetricBarBackground>
        </MetricWrapper>
        <IconWrapper>
          <ValenceIcon />
        </IconWrapper>
      </Metric>
      <Metric>
        <MetricWrapper>
          <MetricBarBackground>
            <MetricBar percentageHeight={getPopularityFromPlaylistTracks(playlistsTracks)} />
          </MetricBarBackground>
        </MetricWrapper>
        <IconWrapper>
          <PopularityIcon />
        </IconWrapper>
      </Metric>
    </Container>
  );
};

export default Component;
