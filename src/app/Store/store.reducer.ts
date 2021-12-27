import { store } from './store.state';
import { Action, createReducer, on, Store } from '@ngrx/store';
import * as storeActions from './store.actions';

const initialState: store = {
  data: [],
  selectedData: []
};

export const storeFn = createReducer(
  initialState,
  on(storeActions.getDataSuccess, (state, action) => {
    let koncnState = [...state.data];
    action.data.data.forEach((element) => koncnState.push(element));
    return { data: koncnState,
    selectedData: [] };
  }),
  on(storeActions.setSelectedData, (state, action) => {
    let koncnSelected = [...state.selectedData];
    action.selectedData.forEach((element)=> koncnSelected.push(element));
    return { data: state.data,
    selectedData: koncnSelected };
  })
);

export function storeReducer(state = initialState, action: Action): store {
  return storeFn(state, action);
}
