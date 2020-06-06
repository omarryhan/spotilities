import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { checkIsAuthorized, getAllPages, spotifyApi } from '../utils';
import { CombinedStateType } from '../types';

export const deletePlaylists = createAction<void>('playlists/delete');

const userLibraryPlaylist = {
  tracks: {
    href: '',
    total: -1,
  },
  collaborative: false,
  external_urls: {
    spotify: '',
  },
  href: '',
  id: 'userLibrary',
  images: [{
    url: '/cover_art/spotify_likes_icon.png',
  }],
  name: 'Saved Tracks',
  owner: {
    external_urls: {
      spotify: '',
    },
    href: '',
    id: '',
    type: 'user' as const,
    uri: '',
  },
  public: false,
  snapshot_id: '',
  type: 'playlist' as const,
  uri: '',
};

export const fetchUserPlaylists = createAsyncThunk<
SpotifyApi.PlaylistObjectSimplified[],
void,
{ state: CombinedStateType }
>(
  'playlists/set',
  async (_, { getState, dispatch }) => {
    const state = getState();
    const { token } = state.user;
    const { accessToken, expiresAt } = token;
    checkIsAuthorized(accessToken, expiresAt);
    const userId = state.profile.data.id;
    spotifyApi.setAccessToken(accessToken);

    const fullResponse = await getAllPages<SpotifyApi.ListOfUsersPlaylistsResponse>(
      spotifyApi.getUserPlaylists(userId, { limit: 50 }),
    );

    fullResponse.items.unshift(userLibraryPlaylist);

    return fullResponse.items;
  },
);
