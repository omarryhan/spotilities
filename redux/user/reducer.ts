import { createReducer } from '@reduxjs/toolkit';
import { InitialStateInterface } from './types';
import { setAccessToken } from './actions';

export const InitialState: InitialStateInterface = {
  name: '',
  tokens: {
    accessToken: '',
    expiresAt: 0,
  },
};


export const reducer = createReducer<InitialStateInterface>(InitialState, (builder) => {
  builder.addCase(setAccessToken, (state, action) => ({
    ...state,
    tokens: {
      accessToken: action.payload.accessToken,
      expiresAt: action.payload.expiresAt,
    },
  }));
});
