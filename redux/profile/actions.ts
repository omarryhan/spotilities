import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkIsAuthorized, spotifyApi } from '../utils';
import { CombinedStateType } from '../types';

export const fetchUserProfile = createAsyncThunk<
SpotifyApi.CurrentUsersProfileResponse,
void,
{ state: CombinedStateType }
>(
  'profile/set',
  async (_, { getState }) => {
    const state = getState();
    checkIsAuthorized(
      state.user.token.accessToken,
      state.user.token.expiresAt,
      state.user.tokenStatus.errorMessage,
    );
    return spotifyApi.getMe();
  },
);
