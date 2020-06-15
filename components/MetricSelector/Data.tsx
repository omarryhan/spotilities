import React from 'react';
import {
  AllAttributes,
  SliderResults,
} from './types';

import FeatureIcon from '../FeatureIcon';

// id should be the same as the key
export const allAttributes: Partial<AllAttributes> = {
  energy: {
    title: 'Energy',
    id: 'energy',
    description: `
        Energy is a measure from 0 to 100 and represents a perceptual measure of intensity and activity. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.
    `,
    icon: (): ReturnType<React.FC<{}>> => (<FeatureIcon name="energy" />),
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
  acousticness: {
    title: 'Acousticness',
    id: 'acousticness',
    description: `
      A confidence measure of whether the track is acoustic.
    `,
    icon: (): ReturnType<React.FC<{}>> => (<FeatureIcon name="acousticness" />),
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
  danceability: {
    title: 'Danceability',
    id: 'danceability',
    description: `
      Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity.
    `,
    icon: (): ReturnType<React.FC<{}>> => (<FeatureIcon name="danceability" />),
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
      Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Values above 50 are intended to represent instrumental tracks.
    `,
    icon: (): ReturnType<React.FC<{}>> => (<FeatureIcon name="instrumentalness" />),
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
  liveness: {
    title: 'Liveness',
    id: 'liveness',
    description: `
      Detects the presence of an audience in the recording. A value above 80 provides strong likelihood that the track is live.
    `,
    icon: (): ReturnType<React.FC<{}>> => (<FeatureIcon name="liveness" />),
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
  loudness: {
    title: 'Loudness',
    id: 'loudness',
    description: `
      The overall loudness of a track in decibels (dB). Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude).
    `,
    icon: (): ReturnType<React.FC<{}>> => (<FeatureIcon name="loudness" />),
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
  popularity: {
    title: 'Popularity',
    id: 'popularity',
    description: `
      The popularity of the track. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.
    `,
    icon: (): ReturnType<React.FC<{}>> => (<FeatureIcon name="popularity" />),
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
  speechiness: {
    title: 'Speechiness',
    id: 'speechiness',
    description: `
      Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 100 the attribute value. Values above 66 describe tracks that are probably made entirely of spoken words. Values between 33 and 66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 33 most likely represent music and other non-speech-like tracks.
    `,
    icon: (): ReturnType<React.FC<{}>> => (<FeatureIcon name="speechiness" />),
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
  tempo: {
    title: 'Tempo',
    id: 'tempo',
    description: `
      The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.
    `,
    icon: (): ReturnType<React.FC<{}>> => (<FeatureIcon name="tempo" />),
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
  valence: {
    title: 'Valence',
    id: 'valence',
    description: `
      A measure from 0 to 100 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
    `,
    icon: (): ReturnType<React.FC<{}>> => (<FeatureIcon name="valence" />),
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
