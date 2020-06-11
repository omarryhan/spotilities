import { CombinedState } from 'redux';

import { InitialStateInterface as UserInitialStateInterface } from './user/types';
import { InitialStateInterface as ProfileInitialStateInterface } from './profile/types';
import { InitialStateInterface as PlaylistsInitialStateInterface } from './playlists/types';
import { InitialStateInterface as PlaylistItemsInitialStateInterface } from './playlistItems/types';
import { InitialStateInterface as TracksInitialStateInterface } from './tracks/types';
import { InitialStateInterface as TracksAudioFeaturesInitialStateInterface } from './tracksAudioFeatures/types';
import { InitialStateInterface as ArtistsInitialStateInterface } from './artists/types';
import { InitialStateInterface as TopInitialStateInterface } from './top/types';

export type CombinedStateType = CombinedState<{
  user: UserInitialStateInterface;
  profile: ProfileInitialStateInterface;
  playlists: PlaylistsInitialStateInterface;
  playlistItems: PlaylistItemsInitialStateInterface;
  tracks: TracksInitialStateInterface;
  tracksAudioFeatures: TracksAudioFeaturesInitialStateInterface;
  artists: ArtistsInitialStateInterface;
  top: TopInitialStateInterface;
}>;
