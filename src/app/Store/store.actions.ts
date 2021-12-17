import { createAction, props } from "@ngrx/store";

export enum storeTypes{
  addDataFromGrid = '[store] add grid data'
}


export const addDataFromGrid = createAction(
  storeTypes.addDataFromGrid,
  props<{ value: any }>()
);
