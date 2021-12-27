import { store } from './store.state';
import { Action, createReducer, on, Store } from '@ngrx/store';
import * as storeActions from './store.actions';

const initialState: store = {
  data: [],
};

export const storeFn = createReducer(
  initialState,
  on(storeActions.getDataSuccess, (state, action) => {
    let koncnState = [...state.data];
    action.data.data.forEach((element) => koncnState.push(element));
    return { data: koncnState };
  })
);

export function storeReducer(state = initialState, action: Action): store {
  return storeFn(state, action);
}
