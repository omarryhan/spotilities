import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkIsAuthorized, spotifyApi } from '../utils';

export const fetchUserProfile = createAsyncThunk<
SpotifyApi.CurrentUsersProfileResponse,
void,
{ state: any }
>(
  'profile/set',
  async (_, { getState }) => {
    const state = getState();
    const { token } = state.user;
    const { accessToken, expiresAt } = token;

    checkIsAuthorized(accessToken, expiresAt);
    spotifyApi.setAccessToken(accessToken);
    return await spotifyApi.getMe();
  },
);
