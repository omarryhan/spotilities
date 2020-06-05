import { createReducer } from '@reduxjs/toolkit';
import { InitialStateInterface } from './types';
import { fetchUserPlaylists, deletePlaylists } from './actions';

export const InitialState: InitialStateInterface = {
  data: {},
  status: {
    isFetching: false,
    fetchedOnce: false,
  },
};

// const deleteTracksFromPlaylists = (playlists: AllPlaylists): AllPlaylists => {
//   Object.keys(playlists).forEach((key) => {
//     // eslint-disable-next-line no-param-reassign
//     delete playlists[key].tracks;
//   });
//   return playlists;
// };

export const reducer = createReducer<InitialStateInterface>(InitialState, (builder) => {
  builder.addCase(fetchUserPlaylists.pending, (state, action) => ({
    ...state,
    status: {
      ...state.status,
      isFetching: true,
    },
  }));

  builder.addCase(fetchUserPlaylists.fulfilled, (state, action) => ({
    ...state,
    data: Object.fromEntries(action.payload.map((playlist) => [
      playlist.id,
      playlist,
    ])),
    status: {
      fetchedOnce: true,
      isFetching: false,
    },
  }));

  builder.addCase(fetchUserPlaylists.rejected, (state, action) => ({
    ...state,
    status: {
      ...state.status,
      isFetching: false,
    },
  }));

  builder.addCase(deletePlaylists, (state, action) => ({
    ...InitialState,
  }));
});
