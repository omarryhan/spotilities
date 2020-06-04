import thunk from 'redux-thunk';

import { MakeStore, createWrapper } from 'next-redux-wrapper';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { rootReducer } from './reducer';
import { CombinedStateType } from './types';

export const makeStore: MakeStore<CombinedStateType> = () => configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }), thunk],
  devTools: true,
});

export const wrapper = createWrapper<CombinedStateType>(makeStore, {
  // debug: process.env.NODE_ENV === 'development',
  debug: false,
});
