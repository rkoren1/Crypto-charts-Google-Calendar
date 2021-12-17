import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {storeReducer} from './store.reducer'
import {storeEffects} from './store.effects'
import { StoreFacadeService } from './store-facade.service';

@NgModule({
  imports: [
    StoreModule.forFeature('store', storeReducer),
    EffectsModule.forFeature([storeEffects])
  ],
  providers: [StoreFacadeService],
})
export class FormsStoreModule {}
