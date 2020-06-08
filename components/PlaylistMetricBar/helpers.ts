import { AllTracks } from '../../redux/tracks/types';
import { AllTracksFeatures } from '../../redux/tracksAudioFeatures/types';

import {
  AvailableFeatures,
} from './types';

type Multiplier = {
  [key in AvailableFeatures]: number;
};

const multiplier: Multiplier = {
  valence: 100,
  energy: 100,
  danceability: 100,
  acousticness: 100,
  instrumentalness: 100,
  liveness: 100,
  loudness: -60,
  speechiness: 100,
  tempo: 1000,
};

export const getAudioFeaturesScoreFromPlaylistTracks = (
  tracksAudioFeatures: AllTracksFeatures,
  feature: AvailableFeatures,
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

  return result * multiplier[feature];
};

export const getPopularityScoreFromPlaylistTracks = (playlistTracks: AllTracks): number => {
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
