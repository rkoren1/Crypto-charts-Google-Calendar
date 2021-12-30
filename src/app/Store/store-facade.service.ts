import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as storeActions from './store.actions'
import { store } from './store.state';
import * as storeSelectors from './store.selectors';
import { OblikaPodatkov } from './interfaces/datagrid.model';


@Injectable({
  providedIn: 'root'
})
export class StoreFacadeService {

  getData()
  {
    this.store.dispatch(storeActions.getData());
  }
  setSelectedData(selectedData: OblikaPodatkov[])
  {
    this.store.dispatch(storeActions.setSelectedData({selectedData}));
  }

public selectData$ = this.store.pipe(select(storeSelectors.SelectData));
public getSelectedData$ = this.store.pipe(select(storeSelectors.SelectedData));

constructor(private store: Store<store>) {}
}
