import { store } from './store.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const SelectDataFeature = createFeatureSelector<store>('store');

export const SelectData = createSelector(SelectDataFeature,(stanje)=> stanje.podatki);
