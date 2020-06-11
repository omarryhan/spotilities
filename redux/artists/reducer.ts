import { createReducer } from '@reduxjs/toolkit';
import { InitialStateInterface } from './types';
import { setArtists } from './actions';

export const InitialState: InitialStateInterface = {
  data: {},
  status: {
    isFetching: false,
    fetchedOnce: false,
  },
};

export const reducer = createReducer<InitialStateInterface>(InitialState, (builder) => {
  builder.addCase(setArtists, (state, action) => ({
    ...state,
    data: {
      ...state.data,
      ...Object.fromEntries(action.payload.map((artist) => [
        artist.id,
        {
          data: artist,
          status: {
            isFetching: false,
            fetchedOnce: false,
          },
        },
      ])),
    },
  }));
});
