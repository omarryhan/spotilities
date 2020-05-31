import thunk from 'redux-thunk';

import { MakeStore, createWrapper } from 'next-redux-wrapper';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { RootStateInterface, rootReducer } from './reducer';

export const makeStore: MakeStore<RootStateInterface> = () => configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), thunk],
  devTools: true,
});

export const wrapper = createWrapper<RootStateInterface>(makeStore, { debug: false });
