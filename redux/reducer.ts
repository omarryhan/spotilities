import {
  combineReducers, AnyAction, Reducer,
} from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import { reducer as userReducer } from './user/reducer';
import { reducer as profileReducer } from './profile/reducer';
import { reducer as playlistsReducer } from './playlists/reducer';
import { reducer as playlistItemsReducer } from './playlistItems/reducer';
import { reducer as tracksReducer } from './tracks/reducer';
import { reducer as tracksAudioFeaturesReducer } from './tracksAudioFeatures/reducer';

import { CombinedStateType } from './types';

const allReducers = {
  user: userReducer,
  profile: profileReducer,
  playlists: playlistsReducer,
  playlistItems: playlistItemsReducer,
  tracks: tracksReducer,
  tracksAudioFeatures: tracksAudioFeaturesReducer,
};

export const combinedReducer = combineReducers(allReducers);

export const rootReducer: Reducer = (
  state: CombinedStateType, action: AnyAction,
): CombinedStateType => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combinedReducer(state, action);
};
