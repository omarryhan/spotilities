import { createReducer } from '@reduxjs/toolkit';
import { InitialStateInterface } from './types';
import { setSnackbarState } from './actions';

export const InitialState: InitialStateInterface = {
  snackbar: {
    isOpen: false,
    text: '',
    type: 'neutral',
    action: (): void => {},
    actionText: '',
    time: 2500,
  },
};

export const reducer = createReducer<InitialStateInterface>(InitialState, (builder) => {
  builder.addCase(setSnackbarState, (state, action) => ({
    ...state,
    snackbar: {
      ...state.snackbar,
      ...action.payload,
    },
  }));
});
