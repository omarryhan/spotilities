import { createReducer } from '@reduxjs/toolkit';
import { InitialStateInterface, PlaylistItem, AllPlaylistItems } from './types';
import { fetchAllUserPlaylistsItems, fetchUserPlaylistItems, deletePlaylistsItems } from './actions';

export const InitialState: InitialStateInterface = {
  data: {},
  status: {
    isFetching: false,
    fetchedOnce: false,
  },
};

export const replaceTrackWithTrackId = (
  playlistItems: SpotifyApi.PlaylistTrackObject[],
): {[key: string]: PlaylistItem} => {
  const retval: AllPlaylistItems = {};
  playlistItems.forEach((playlistItem) => {
    retval[playlistItem.track.id] = {
      ...playlistItem,
      trackId: playlistItem.track.id,
    };
    delete retval[playlistItem.track.id].track;
  });
  return retval;
};

export const reducer = createReducer<InitialStateInterface>(InitialState, (builder) => {
  builder.addCase(fetchAllUserPlaylistsItems.pending, (state, action) => ({
    ...state,
    status: {
      ...state.status,
      isFetching: true,
    },
  }));

  builder.addCase(fetchAllUserPlaylistsItems.fulfilled, (state, action) => ({
    ...state,
    status: {
      fetchedOnce: true,
      isFetching: false,
    },
  }));

  builder.addCase(fetchAllUserPlaylistsItems.rejected, (state, action) => ({
    ...state,
    status: {
      ...state.status,
      isFetching: false,
    },
  }));

  // TODO: Find a way to set the isFetching status on this action.
  builder.addCase(fetchUserPlaylistItems.pending, (state, action) => ({
    ...state,
    data: {
      ...state.data,
      [action.meta.arg.playlistId]: {
        data: {},
        status: {
          isFetching: true,
          fetchedOnce: false,
        },
      },
    },
  }));

  builder.addCase(fetchUserPlaylistItems.fulfilled, (state, action) => ({
    ...state,
    data: {
      ...state.data,
      [action.payload.playlistId]: {
        ...state.data[action.payload.playlistId],
        data: replaceTrackWithTrackId(
          action.payload.playlistItems,
        ),
        status: {
          isFetching: false,
          fetchedOnce: true,
        },
      },
    },
  }));

  builder.addCase(fetchUserPlaylistItems.rejected, (state, action) => ({
    ...state,
    data: {
      ...state.data,
      [action.meta.arg.playlistId]: {
        data: {},
        status: {
          isFetching: false,
          fetchedOnce: false,
        },
      },
    },
  }));

  builder.addCase(deletePlaylistsItems, (state, action) => ({
    ...InitialState,
    status: {
      ...InitialState.status,
      isFetching: action.payload.isFetching,
    },
  }));
});
