import { createReducer } from '@reduxjs/toolkit';
import { InitialStateInterface } from './types';
import { setTracks } from './actions';

export const InitialState: InitialStateInterface = {
  data: {},
  status: {
    isFetching: false,
    fetchedOnce: false,
  },
};

export const reducer = createReducer<InitialStateInterface>(InitialState, (builder) => {
  builder.addCase(setTracks, (state, action) => ({
    ...state,
    data: {
      ...state.data,
      ...Object.fromEntries(action.payload.map((track) => [
        track.id,
        {
          data: track,
          status: {
            isFetching: false,
            fetchedOnce: false,
          },
        },
      ])),
    },
  }));
});
