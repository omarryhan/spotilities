import { createReducer } from '@reduxjs/toolkit';
import { InitialStateInterface } from './types';
import { fetchUserProfile } from './actions';

export const InitialState: InitialStateInterface = {
  data: {
    birthdate: '',
    country: '',
    display_name: '',
    email: '',
    explicit_content: {
      filter_enabled: null,
      filter_locked: null,
    },
    external_urls: {
      spotify: '',
    },
    followers: {
      href: '',
      // @ts-ignore
      total: '',
    },
    href: '',
    id: '',
    images: [],
    product: '',
    // @ts-ignore
    type: '',
    uri: '',
  },
  status: {
    isFetching: false,
    fetchedOnce: false,
  },
};

export const reducer = createReducer<InitialStateInterface>(InitialState, (builder) => {
  builder.addCase(fetchUserProfile.pending, (state, action) => ({
    ...state,
    status: {
      isFetching: true,
      fetchedOnce: false,
    },
  }));

  builder.addCase(fetchUserProfile.fulfilled, (state, action) => ({
    ...state,
    data: action.payload as SpotifyApi.CurrentUsersProfileResponse,
    status: {
      isFetching: false,
      fetchedOnce: true,
    },
  }));

  builder.addCase(fetchUserProfile.rejected, (state, action) => ({
    ...state,
    status: {
      isFetching: false,
      fetchedOnce: false,
    },
  }));
});
