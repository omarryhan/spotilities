import {
  combineReducers, AnyAction, CombinedState, Reducer,
} from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import { reducer as userReducer } from './user/reducer';
import { InitialStateInterface as UserInitialStateInterface } from './user/types';

const allReducers = {
  user: userReducer,
};

type CombinedStateAll = CombinedState<{
  user: UserInitialStateInterface;
}>;

export const combinedReducer = combineReducers(allReducers);

export const rootReducer: Reducer = (
  state: CombinedStateAll, action: AnyAction,
): CombinedStateAll => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combinedReducer(state, action);
};

export type RootStateInterface = ReturnType<typeof rootReducer>;
