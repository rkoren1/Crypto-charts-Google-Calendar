import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as storeActions from './store.actions'
import { store } from './store.state';
import * as storeSelectors from './store.selectors';


@Injectable({
  providedIn: 'root'
})
export class StoreFacadeService {

public selectData$ = this.store.pipe(select(storeSelectors.SelectData));

constructor(private store: Store<store>) {}
}
