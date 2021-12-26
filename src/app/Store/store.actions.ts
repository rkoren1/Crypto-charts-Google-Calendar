import { createAction, props } from '@ngrx/store';
import {store } from './store.state';

export enum storeTypes {
  getData = '[store] get data with http get request',
  getDataSuccess = '[store] get data success',
  getDataFailure = '[store] get data failure',
}

export const getData = createAction(storeTypes.getData);

export const getDataSuccess = createAction(
  storeTypes.getDataSuccess,
  props<{ data: store }>()
);

export const getDataFailure = createAction(
  storeTypes.getDataFailure,
  props<{ error: any }>()
);
