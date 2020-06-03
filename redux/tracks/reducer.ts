import { createReducer } from '@reduxjs/toolkit';
import { InitialStateInterface } from './types';
import { setTracks } from './actions';
import { convertArrayToObject } from '../../utils';

export const InitialState: InitialStateInterface = {
  data: {},
  status: {
    isFetching: false,
    fetchedOnce: false,
  },
};

export const reducer = createReducer<InitialStateInterface>(InitialState, (builder) => {
  builder.addCase(setTracks, (state, action) => ({
    ...state,
    data: {
      ...state.data,
      ...convertArrayToObject(action.payload, 'id'),
    },
  }));
});
