import React from 'react';
import {
  AllAttributes,
  SliderResults,
} from './types';

import FeatureIcon from '../FeatureIcon';

// id should be the same as the key
// to control the order of which this object
// is represented, change the order of the initial sate
// of the recommendations reducer and not the keys of this
// object
export const allAttributes: Partial<AllAttributes> = {
  danceability: {
    title: 'Danceability',
    id: 'danceability',
    description: `
      Filter by tempo, rhythm stability, beat strength, and overall regularity.
    `,
    icon: (): ReturnType<React.FC> => (<FeatureIcon name="danceability" />),
    isActivatedPayload: {
      isActivated: true,
      max: 100,
      min: 0,
    },
    resultsTransformer: ({ max, min }): SliderResults => ({
      max: max / 100,
      min: min / 100,
    }),
  },
  energy: {
    title: 'Energy',
    id: 'energy',
    description: `
      Filter by dynamic range, perceived loudness, timbre, onset rate, and general entropy.
    `,
    icon: (): ReturnType<React.FC> => (<FeatureIcon name="energy" />),
    isActivatedPayload: {
      isActivated: true,
      max: 100,
      min: 0,
    },
    resultsTransformer: ({ max, min }): SliderResults => ({
      max: max / 100,
      min: min / 100,
    }),
  },
  valence: {
    title: 'Valence',
    id: 'valence',
    description: `
      Tracks with high valence sound more positive, while tracks with low valence sound more negative.
    `,
    icon: (): ReturnType<React.FC> => (<FeatureIcon name="valence" />),
    isActivatedPayload: {
      isActivated: true,
      max: 100,
      min: 0,
    },
    resultsTransformer: ({ max, min }): SliderResults => ({
      max: max / 100,
      min: min / 100,
    }),
  },
  popularity: {
    title: 'Popularity',
    id: 'popularity',
    description: `
      Filter by the total number of plays the track has had and how recent those plays are.
    `,
    icon: (): ReturnType<React.FC> => (<FeatureIcon name="popularity" />),
    isActivatedPayload: {
      isActivated: true,
      max: 100,
      min: 0,
    },
    resultsTransformer: ({ max, min }): SliderResults => ({
      max,
      min,
    }),
  },
  tempo: {
    title: 'Tempo',
    id: 'tempo',
    description: `
      The overall estimated tempo of a track in beats per minute (BPM).
    `,
    icon: (): ReturnType<React.FC> => (<FeatureIcon name="tempo" />),
    isActivatedPayload: {
      isActivated: true,
      max: 300,
      min: 0,
    },
    resultsTransformer: ({ max, min }): SliderResults => ({
      max,
      min,
    }),
  },
  duration_ms: {
    title: 'Duration',
    id: 'duration_ms',
    description: `
      The duration of the track in minutes.
    `,
    icon: (): ReturnType<React.FC> => (<FeatureIcon name="duration_ms" />),
    isActivatedPayload: {
      isActivated: true,
      max: 120,
      min: 0,
    },
    resultsTransformer: ({ max, min }): SliderResults => ({
      max: max * 60 * 1000,
      min: min * 60 * 1000,
    }),
  },
  liveness: {
    title: 'Liveness',
    id: 'liveness',
    description: `
      Detects the presence of an audience in the recording.
    `,
    icon: (): ReturnType<React.FC> => (<FeatureIcon name="liveness" />),
    isActivatedPayload: {
      isActivated: true,
      max: 100,
      min: 0,
    },
    resultsTransformer: ({ max, min }): SliderResults => ({
      max: max / 100,
      min: min / 100,
    }),
  },
  // disabling for now because Material UI slider acts funky with negative values
  loudness: {
    title: 'Loudness',
    id: 'loudness',
    description: `
      The overall loudness of a track in decibels (dB).
    `,
    icon: (): ReturnType<React.FC> => (<FeatureIcon name="loudness" />),
    isActivatedPayload: {
      isActivated: true,
      max: 0,
      min: -60,
    },
    resultsTransformer: ({ max, min }): SliderResults => ({
      max,
      min,
    }),
  },
  acousticness: {
    title: 'Acousticness',
    id: 'acousticness',
    description: `
      A confidence measure of whether the track is acoustic.
    `,
    icon: (): ReturnType<React.FC> => (<FeatureIcon name="acousticness" />),
    isActivatedPayload: {
      isActivated: true,
      max: 100,
      min: 0,
    },
    resultsTransformer: ({ max, min }): SliderResults => ({
      max: max / 100,
      min: min / 100,
    }),
  },
  instrumentalness: {
    title: 'Instrumentalness',
    id: 'instrumentalness',
    description: `
      Values above 50 are intended to represent instrumental tracks, less is for tracks with vocals.
    `,
    icon: (): ReturnType<React.FC> => (<FeatureIcon name="instrumentalness" />),
    isActivatedPayload: {
      isActivated: true,
      max: 100,
      min: 0,
    },
    resultsTransformer: ({ max, min }): SliderResults => ({
      max: max / 100,
      min: min / 100,
    }),
  },
  speechiness: {
    title: 'Speechiness',
    id: 'speechiness',
    description: `
      Filter by the amount of spoken words in a track. Values under 30 should have no spoken words.
    `,
    icon: (): ReturnType<React.FC> => (<FeatureIcon name="speechiness" />),
    isActivatedPayload: {
      isActivated: true,
      max: 100,
      min: 0,
    },
    resultsTransformer: ({ max, min }): SliderResults => ({
      max: max / 100,
      min: min / 100,
    }),
  },
};
