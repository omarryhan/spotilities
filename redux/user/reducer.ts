import { createReducer } from '@reduxjs/toolkit';
import { InitialStateInterface } from './types';
import { setAccessToken, setTokenErrorMessage } from './actions';

export const InitialState: InitialStateInterface = {
  name: '',
  token: {
    accessToken: '',
    expiresAt: 0,
  },
  tokenStatus: {
    errorMessage: '',
  },
};

export const reducer = createReducer<InitialStateInterface>(InitialState, (builder) => {
  builder.addCase(setAccessToken, (state, action) => ({
    ...state,
    token: {
      accessToken: action.payload.accessToken,
      expiresAt: action.payload.expiresAt,
    },
  }));

  builder.addCase(setTokenErrorMessage, (state, action) => ({
    ...state,
    tokenStatus: {
      ...state.tokenStatus,
      errorMessage: action.payload,
    },
  }));
});
