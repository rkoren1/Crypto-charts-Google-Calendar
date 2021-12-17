import { store } from "./store.state";
import { Action, createReducer, on } from "@ngrx/store";

const initialState: store = {
}

export const storeFn = createReducer(initialState,()=>{} );
export function storeReducer(state=initialState,action:Action): store{return storeFn(state,action)};
