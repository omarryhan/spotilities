import React from 'react';
import { useSelector } from 'react-redux';
import { CombinedStateType } from '../../redux/types';
import {
  Container,
} from './Styled';

import { AllTracks } from '../../redux/tracks/types';
import { AllTracksFeatures } from '../../redux/tracksAudioFeatures/types';
import PlaylistMetricBar from '../PlaylistMetricBar';
import {
  getPopularityScoreFromPlaylistTracks,
  getAudioFeaturesScoreFromPlaylistTracks,
} from '../PlaylistMetricBar/helpers';
import {
  AvailableFeatures, AvailableMetrics,
} from '../PlaylistMetricBar/types';


const Component: React.FC<{trackIds: string[]}> = ({ trackIds }) => {
  const playlistsTracks = useSelector<CombinedStateType, AllTracks>(
    (state) => {
      const keys = Object.keys(state.tracks.data).filter(
        (trackId) => trackIds.includes(trackId),
      );
      return Object.fromEntries(keys.map(
        (id) => [id, state.tracks.data[id]],
      ));
    },
  );

  const playlistAudioFeatures = useSelector<CombinedStateType, AllTracksFeatures>(
    (state) => {
      const keys = Object.keys(state.tracksAudioFeatures.data).filter(
        (trackId) => trackIds.includes(trackId),
      );

      return Object.fromEntries(keys.map((
        (id) => [id, state.tracksAudioFeatures.data[id]]
      )));
    },
  );

  return (
    <Container>
      {
        ([
          'energy', 'danceability', 'valence', 'popularity',
        ] as AvailableMetrics[]).map((name) => (
          <PlaylistMetricBar
            name={name}
            key={name}
            percentageHeight={name === 'popularity'
              ? getPopularityScoreFromPlaylistTracks(playlistsTracks)
              : getAudioFeaturesScoreFromPlaylistTracks(
                playlistAudioFeatures, name as AvailableFeatures,
              )}
          />
        ))
      }
    </Container>
  );
};

export default Component;
