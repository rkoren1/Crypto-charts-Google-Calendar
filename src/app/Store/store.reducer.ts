import { store } from './store.state';
import { Action, createReducer, on, Store } from '@ngrx/store';
import * as storeActions from './store.actions';

const initialState: store = {
  data: [],
  selectedData: [],
  selectedGroups: [],
};

export const storeFn = createReducer(
  initialState,
  on(storeActions.getDataSuccess, (state, action) => {
    return { ...state, data: action.data };
  }),
  on(storeActions.setSelectedData, (state, action) => {
    return { ...state, selectedData: action.selectedData };
  }),
  on(storeActions.setSelectedGroups, (state, action) => {
    return { ...state, selectedGroups: action.selectedGroups };
  })
);

export function storeReducer(state = initialState, action: Action): store {
  return storeFn(state, action);
}
