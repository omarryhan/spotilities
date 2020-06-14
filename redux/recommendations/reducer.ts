import { createReducer } from '@reduxjs/toolkit';
import { InitialStateInterface } from './types';
import { setTrackResults, addTrackSeed, removeSeedTrack } from './actions';

export const InitialState: InitialStateInterface = {
  results: {
    trackIds: [],
  },
  seedTracks: [],
  status: {
    isFetching: false,
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
});
