import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { SalesDashboardComponent } from './SalesDashboard/SalesDashboard.component';
import { ProductsComponent } from './products/products.component';
import { SectorsComponent } from './sectors/sectors.component';
import { RegionsComponent } from './regions/regions.component';
import { ChannelsComponent } from './channels/channels.component';
import { GeographyComponent } from './geography/geography.component';
import { DailySalesComponent } from './dailySales/dailySales.component';
import { DetailGridComponent } from './detail-grid/detail-grid.component';

import {FormsStoreModule} from './Store/store.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
      SalesDashboardComponent,
      ProductsComponent,
      SectorsComponent,
      RegionsComponent,
      ChannelsComponent,
      GeographyComponent,
      DailySalesComponent,
      DetailGridComponent
   ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    DxButtonModule,
    DxDataGridModule,
    FormsStoreModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [AuthService, ScreenService, AppInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
