import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkIsAuthorized, getAllPages, spotifyApi } from '../utils';


export const fetchUserPlaylists = createAsyncThunk<
SpotifyApi.PlaylistObjectSimplified[],
void,
{ state: any }
>(
  'playlists/set',
  async (_, { getState }) => {
    const state = getState();
    const { token } = state.user;
    const { accessToken, expiresAt } = token;
    checkIsAuthorized(accessToken, expiresAt);
    const userId = state.profile.data.id as string;
    spotifyApi.setAccessToken(accessToken);

    const fullResponse = await getAllPages<SpotifyApi.ListOfUsersPlaylistsResponse>(
      spotifyApi.getUserPlaylists(userId, { limit: 50 }),
    );

    return fullResponse.items;
  },
);
