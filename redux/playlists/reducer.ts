import { createReducer } from '@reduxjs/toolkit';
import { InitialStateInterface } from './types';
import {
  fetchUserPlaylists,
  updateUserPlaylistInfo,
  deletePlaylists,
  updateUserPlaylistCover,
} from './actions';

export const InitialState: InitialStateInterface = {
  data: {},
  status: {
    isFetching: false,
    fetchedOnce: false,
    isUpdating: false,
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
      isUpdating: false,
      fetchedOnce: true,
      isFetching: false,
    },
  }));

  builder.addCase(updateUserPlaylistInfo.rejected, (state, action) => ({
    ...state,
    status: {
      ...state.status,
      isUpdating: false,
    },
  }));

  builder.addCase(updateUserPlaylistInfo.pending, (state, action) => ({
    ...state,
    status: {
      ...state.status,
      isUpdating: true,
    },
  }));

  builder.addCase(updateUserPlaylistInfo.fulfilled, (state, action) => ({
    ...state,
    status: {
      isUpdating: false,
      fetchedOnce: false,
      isFetching: false,
    },
  }));

  builder.addCase(updateUserPlaylistCover.rejected, (state, action) => ({
    ...state,
    status: {
      ...state.status,
      isUpdating: false,
    },
  }));

  builder.addCase(updateUserPlaylistCover.pending, (state, action) => ({
    ...state,
    status: {
      ...state.status,
      isUpdating: true,
    },
  }));

  builder.addCase(updateUserPlaylistCover.fulfilled, (state, action) => ({
    ...state,
    status: {
      isUpdating: false,
      fetchedOnce: false,
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
