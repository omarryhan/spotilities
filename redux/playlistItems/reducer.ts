import { createReducer } from '@reduxjs/toolkit';
import { BottomNavigationAction } from '@material-ui/core';
import { InitialStateInterface, PlaylistItem, AllPlaylistItems } from './types';
import {
  fetchUserPlaylistItems,
  setPlaylistItems,
} from './actions';

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

  builder.addCase(setPlaylistItems, (state, action) => ({
    ...state,
    data: {
      ...state.data,
      [action.payload.playlistId]: {
        status: {
          ...(
            state.data[action.payload.playlistId]
              ? state.data[action.payload.playlistId].status
              : {
                // this should probably be false but it seems that this action
                // isn't able to read the state that was dispatched in
                // fetchUserPlaylistItems.pending which can be the async action
                // that dispatches this action. If you flip this to false,
                // fetchUserPlaylistItems.pending should first set this to true
                // but for some reason this action doesn't pick up this change
                // and the change is only dispatched after all the pages has been set
                // then instantly set to false when the async action is fullfilled (or rejected)
                isFetching: true,
                fetchedOnce: false,
              }
          ),
        },
        data: {
          ...(
            state.data[action.payload.playlistId]
              ? state.data[action.payload.playlistId].data
              : {}
          ),
          ...replaceTrackWithTrackId(
            action.payload.playlistItems,
          ),
        },
      },
    },
  }));
});
