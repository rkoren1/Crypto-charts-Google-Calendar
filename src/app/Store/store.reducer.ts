import { store } from './store.state';
import { Action, createReducer, on, Store } from '@ngrx/store';
import * as storeActions from './store.actions';

const initialState: store = {
  data: [],
};

export const storeFn = createReducer(
  initialState,
  on(storeActions.getDataSuccess, (state, action) => {
    return action.data;
  })
);

export function storeReducer(state = initialState, action: Action): store {
  return storeFn(state, action);
}
