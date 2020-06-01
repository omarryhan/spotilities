import {
  combineReducers, AnyAction, CombinedState, Reducer,
} from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import { reducer as userReducer } from './user/reducer';
import { InitialStateInterface as UserInitialStateInterface } from './user/types';

import { reducer as profileReducer } from './profile/reducer';
import { InitialStateInterface as ProfileInitialStateInterface } from './profile/types';

const allReducers = {
  user: userReducer,
  profile: profileReducer,
};

type CombinedStateAll = CombinedState<{
  user: UserInitialStateInterface;
  profile: ProfileInitialStateInterface;
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
// export type RootStateInterface = CombinedStateAll;
