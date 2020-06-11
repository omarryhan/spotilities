import thunk from 'redux-thunk';

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { combinedReducer } from './reducer';

export const store = configureStore({
  reducer: combinedReducer,
  middleware: [...getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }), thunk],
  devTools: true,
});
