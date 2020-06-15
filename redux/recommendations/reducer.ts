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
  setMetricIsActivated,
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
    danceability: {
      isActivated: false,
      min: 0,
      max: 100,
    },
    energy: {
      isActivated: false,
      min: 0,
      max: 100,
    },
    valence: {
      isActivated: false,
      min: 0,
      max: 100,
    },
    popularity: {
      isActivated: false,
      min: 0,
      max: 100,
    },
    tempo: {
      isActivated: false,
      min: 0,
      max: 120,
    },
    duration_ms: {
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
      min: -60,
      max: 0,
    },
    acousticness: {
      isActivated: false,
      min: 0,
      max: 100,
    },
    instrumentalness: {
      isActivated: false,
      min: 0,
      max: 100,
    },
    speechiness: {
      isActivated: false,
      min: 0,
      max: 100,
    },
    mode: { // not being used
      isActivated: false,
      min: 0,
      max: 100,
    },
    key: { // not being used
      isActivated: false,
      min: 0,
      max: 100,
    },
    time_signature: { // not being used
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

  // builder.addCase(setMetric, (state, action) => ({
  //   ...state,
  //   metrics: {
  //     ...state.metrics,
  //     [action.payload.name]: action.payload.attributes,
  //   },
  // }));

  // order of the list is not being preserved on IOS Safari
  // That's why we're mutating the state here (which isn't really being mutated
  // because Redux toolkit uses Immer under the hood which "purifies" any mutations)
  builder.addCase(setMetric, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.metrics[action.payload.name] = action.payload.attributes;
  });

  // TODO: make it push the modified metric to the end of the dict
  // You probably won't be able to do that using the current setup
  // because objects preserving their order is an implementation detail
  // in most if not all JS implementations. You'll probably need to
  // add an array with the keys sorted as required
  builder.addCase(setMetricIsActivated, (state, action) => ({
    ...state,
    metrics: {
      ...state.metrics,
      [action.payload.name]: {
        ...state.metrics[action.payload.name],
        isActivated: action.payload.value,
      },
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
