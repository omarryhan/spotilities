import {
  combineReducers, AnyAction, CombinedState, Reducer,
} from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import { reducer as userReducer } from './user/reducer';
import { InitialStateInterface as UserInitialStateInterface } from './user/types';

import { reducer as profileReducer } from './profile/reducer';
import { InitialStateInterface as ProfileInitialStateInterface } from './profile/types';

import { reducer as playlistsReducer } from './playlists/reducer';
import { InitialStateInterface as PlaylistsInitialStateInterface } from './playlists/types';

import { reducer as playlistItemsReducer } from './playlistItems/reducer';
import { InitialStateInterface as PlaylistItemsInitialStateInterface } from './playlistItems/types';

import { reducer as tracksReducer } from './tracks/reducer';
import { InitialStateInterface as TracksInitialStateInterface } from './tracks/types';

const allReducers = {
  user: userReducer,
  profile: profileReducer,
  playlists: playlistsReducer,
  playlistItems: playlistItemsReducer,
  tracks: tracksReducer,
};

type CombinedStateAll = CombinedState<{
  user: UserInitialStateInterface;
  profile: ProfileInitialStateInterface;
  playlists: PlaylistsInitialStateInterface;
  playlistItems: PlaylistItemsInitialStateInterface;
  tracks: TracksInitialStateInterface;
}>;

export const combinedReducer = combineReducers(allReducers);

export const rootReducer: Reducer = (
  state: CombinedStateAll, action: AnyAction,
): CombinedStateAll => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combinedReducer(state, action);
};

export type RootStateInterface = ReturnType<typeof rootReducer>;
// export type RootStateInterface = CombinedStateAll;
