import { createReducer } from '@reduxjs/toolkit';
import { InitialStateInterface } from './types';
import {
  setTrackResults,
  addTrackSeed,
  removeSeedTrack,
  setMetric,
} from './actions';

export const InitialState: InitialStateInterface = {
  results: {
    trackIds: [],
  },
  seedTracks: [],
  status: {
    isFetching: false,
  },
  metrics: {
    acousticness: {
      isActivated: false,
    },
    danceability: {
      isActivated: false,
    },
    duration_ms: {
      isActivated: false,
    },
    energy: {
      isActivated: false,
    },
    instrumentalness: {
      isActivated: false,
    },
    liveness: {
      isActivated: false,
    },
    loudness: {
      isActivated: false,
    },
    popularity: {
      isActivated: false,
    },
    speechiness: {
      isActivated: false,
    },
    mode: {
      isActivated: false,
    },
    key: {
      isActivated: false,
    },
    tempo: {
      isActivated: false,
    },
    time_signature: {
      isActivated: false,
    },
    valence: {
      isActivated: false,
    },
  },
};

export const reducer = createReducer<InitialStateInterface>(InitialState, (builder) => {
  builder.addCase(addTrackSeed, (state, action) => ({
    ...state,
    seedTracks: [
      ...state.seedTracks,
      action.payload,
    ],
  }));

  builder.addCase(removeSeedTrack, (state, action) => ({
    ...state,
    seedTracks: state.seedTracks.filter((seedTrack) => seedTrack !== action.payload),
  }));

  builder.addCase(setTrackResults, (state, action) => ({
    ...state,
    results: {
      trackIds: action.payload,
    },
  }));

  builder.addCase(setMetric, (state, action) => ({
    ...state,
    metrics: {
      ...state.metrics,
      [action.payload.name]: action.payload.attributes,
    },
  }));
});
