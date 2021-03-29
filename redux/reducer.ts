import {
  combineReducers,
} from 'redux';

import { reducer as userReducer } from './user/reducer';
import { reducer as profileReducer } from './profile/reducer';
import { reducer as playlistsReducer } from './playlists/reducer';
import { reducer as playlistItemsReducer } from './playlistItems/reducer';
import { reducer as tracksReducer } from './tracks/reducer';
import { reducer as tracksAudioFeaturesReducer } from './tracksAudioFeatures/reducer';
import { reducer as artistsReducer } from './artists/reducer';
import { reducer as topReducer } from './top/reducer';
import { reducer as recommendationsReducer } from './recommendations/reducer';
import { reducer as uiReducer } from './ui/reducer';

const allReducers = {
  user: userReducer,
  profile: profileReducer,
  playlists: playlistsReducer,
  playlistItems: playlistItemsReducer,
  tracks: tracksReducer,
  tracksAudioFeatures: tracksAudioFeaturesReducer,
  artists: artistsReducer,
  top: topReducer,
  recommendations: recommendationsReducer,
  ui: uiReducer,
};

export const combinedReducer = combineReducers(allReducers);
