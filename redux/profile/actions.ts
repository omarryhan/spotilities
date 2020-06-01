import { createAsyncThunk } from '@reduxjs/toolkit';
import { DataInterface } from './types';
import { send } from '../utils';
import { getUserProfile } from '../../configs/urls';
import { ApiJsonResponse } from '../../types';

export const fetchUserProfile = createAsyncThunk<
ApiJsonResponse,
void,
{ state: any }
>(
  'profile/set',
  async (_, { getState }) => {
    const state = getState();
    const { token } = state.user;
    const { accessToken, expiresAt } = token;

    const response = await send<DataInterface>(
      getUserProfile(),
      accessToken,
      expiresAt,
    );

    return response;
  },
);
