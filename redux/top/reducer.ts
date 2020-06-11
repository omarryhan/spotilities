import { createReducer } from '@reduxjs/toolkit';
import { InitialStateInterface, TopType } from './types';
import { fetchTopItems } from './actions';

const TopInitialState: TopType = {
  data: [],
  status: {
    isFetching: false,
    fetchedOnce: false,
  },
};

export const InitialState: InitialStateInterface = {
  tracks: {
    oneMonth: TopInitialState,
    threeMonths: TopInitialState,
    allTime: TopInitialState,
  },
  artists: {
    oneMonth: TopInitialState,
    threeMonths: TopInitialState,
    allTime: TopInitialState,
  },
};

export const reducer = createReducer<InitialStateInterface>(InitialState, (builder) => {
  builder.addCase(fetchTopItems.pending, (state, action) => ({
    ...state,
    [action.meta.arg.resourceType]: {
      ...state[action.meta.arg.resourceType],
      [action.meta.arg.duration]: {
        ...state[action.meta.arg.resourceType][action.meta.arg.duration],
        status: {
          ...state[action.meta.arg.resourceType][action.meta.arg.duration].status,
          isFetching: true,
        },
      },
    },
  }));

  builder.addCase(fetchTopItems.fulfilled, (state, action) => ({
    ...state,
    [action.meta.arg.resourceType]: {
      ...state[action.meta.arg.resourceType],
      [action.meta.arg.duration]: {
        data: action.payload.items,
        status: {
          isFetching: false,
          fetchedOnce: false,
        },
      },
    },
  }));

  builder.addCase(fetchTopItems.rejected, (state, action) => ({
    ...state,
    [action.meta.arg.resourceType]: {
      ...state[action.meta.arg.resourceType],
      [action.meta.arg.duration]: {
        ...state[action.meta.arg.resourceType][action.meta.arg.duration],
        status: {
          ...state[action.meta.arg.resourceType][action.meta.arg.duration].status,
          isFetching: false,
          fetchedOnce: false,
        },
      },
    },
  }));
});
