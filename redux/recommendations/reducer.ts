import { createReducer } from '@reduxjs/toolkit';
import { InitialStateInterface } from './types';
import {
  setTrackResults,
  addTrackSeed,
  removeSeedTrack,
  setMetric,
  fetchRecommendations,
  clearRecommendationsInput,
  clearRecommendationsResults,
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
      min: 0,
      max: 100,
    },
    danceability: {
      isActivated: false,
      min: 0,
      max: 100,
    },
    duration_ms: {
      isActivated: false,
      min: 0,
      max: 100,
    },
    energy: {
      isActivated: false,
      min: 0,
      max: 100,
    },
    instrumentalness: {
      isActivated: false,
      min: 0,
      max: 100,
    },
    liveness: {
      isActivated: false,
      min: 0,
      max: 100,
    },
    loudness: {
      isActivated: false,
      min: 0,
      max: 100,
    },
    popularity: {
      isActivated: false,
      min: 0,
      max: 100,
    },
    speechiness: {
      isActivated: false,
      min: 0,
      max: 100,
    },
    mode: {
      isActivated: false,
      min: 0,
      max: 100,
    },
    key: {
      isActivated: false,
      min: 0,
      max: 100,
    },
    tempo: {
      isActivated: false,
      min: 0,
      max: 100,
    },
    time_signature: {
      isActivated: false,
      min: 0,
      max: 100,
    },
    valence: {
      isActivated: false,
      min: 0,
      max: 100,
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

  builder.addCase(fetchRecommendations.pending, (state, action) => ({
    ...state,
    status: {
      isFetching: true,
    },
  }));

  builder.addCase(fetchRecommendations.fulfilled, (state, action) => ({
    ...state,
    status: {
      isFetching: false,
    },
  }));

  builder.addCase(fetchRecommendations.rejected, (state, action) => ({
    ...state,
    status: {
      isFetching: false,
    },
  }));

  builder.addCase(clearRecommendationsInput, (state, action) => ({
    ...state,
    seedTracks: InitialState.seedTracks,
    metrics: InitialState.metrics,
  }));

  builder.addCase(clearRecommendationsResults, (state, action) => ({
    ...state,
    results: InitialState.results,
  }));
});
