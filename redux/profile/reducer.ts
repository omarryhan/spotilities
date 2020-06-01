import { createReducer } from '@reduxjs/toolkit';
import { InitialStateInterface, DataInterface } from './types';
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
      total: '',
    },
    href: '',
    id: '',
    images: [],
    product: '',
    type: '',
    uri: '',
  },
  status: {
    isFetching: false,
  },
};

export const reducer = createReducer<InitialStateInterface>(InitialState, (builder) => {
  builder.addCase(fetchUserProfile.pending, (state, action) => ({
    ...state,
    status: {
      isFetching: true,
    },
  }));

  builder.addCase(fetchUserProfile.fulfilled, (state, action) => ({
    ...state,
    data: action.payload as DataInterface,
    status: {
      isFetching: false,
    },
  }));

  builder.addCase(fetchUserProfile.rejected, (state, action) => ({
    ...state,
    status: {
      isFetching: false,
    },
  }));
});
