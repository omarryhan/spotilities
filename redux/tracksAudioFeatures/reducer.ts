import { createReducer } from '@reduxjs/toolkit';
import { InitialStateInterface } from './types';
import { fetchAllPlaylistsItemsAudioFeatures, setTracksAudioFeatures } from './actions';

export const InitialState: InitialStateInterface = {
  data: {},
  status: {
    isFetching: false,
    fetchedOnce: false,
  },
};

export const reducer = createReducer<InitialStateInterface>(InitialState, (builder) => {
  builder.addCase(fetchAllPlaylistsItemsAudioFeatures.pending, (state, action) => ({
    ...state,
    status: {
      ...state.status,
      isFetching: true,
    },
  }));

  builder.addCase(fetchAllPlaylistsItemsAudioFeatures.fulfilled, (state, action) => ({
    ...state,
    status: {
      fetchedOnce: true,
      isFetching: false,
    },
  }));

  builder.addCase(fetchAllPlaylistsItemsAudioFeatures.rejected, (state, action) => ({
    ...state,
    status: {
      fetchedOnce: true,
      isFetching: false,
    },
  }));

  builder.addCase(setTracksAudioFeatures, (state, action) => ({
    ...state,
    data: {
      ...state.data,
      ...Object.fromEntries(Object.keys(action.payload).map((trackId) => [
        trackId,
        {
          data: action.payload[trackId],
          status: {
            isFetching: false,
            fetchedOnce: false,
          },
        },
      ])),
    },
  }));
});
