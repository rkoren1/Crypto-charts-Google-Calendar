import { store } from "./store.state";
import { Action, createReducer, on } from "@ngrx/store";
import * as storeActions from './store.actions'

const initialState: store = {
  podatki: undefined
}

export const storeFn = createReducer(initialState,on(storeActions.addDataFromGrid, (state, action) =>{
  return {
    ...state
  };
}) );

export function storeReducer(state=initialState,action:Action): store{return storeFn(state,action)};


