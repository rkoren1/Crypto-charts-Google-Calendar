import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule } from './layouts';
import { ScreenService, AppInfoService } from './shared/services';
import { AppRoutingModule } from './app-routing.module';
import {
  DxButtonModule,
  DxChartModule,
  DxDataGridModule,
  DxPieChartModule,
  DxSchedulerModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { GraphsDisplayComponent } from './graphs-display/graphs-display.component';
import { FormsStoreModule } from './Store/store.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommonModule, DatePipe } from '@angular/common';
import { StandardChartComponent } from './graphs-display/standard-chart/standard-chart.component';
import { JsonTableComponent } from './jsonTable/json-table.component';
import { HttpClientModule } from '@angular/common/http';
import { StackedChartComponent } from './graphs-display/stackedChart/stacked-chart.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphsDisplayComponent,
    StandardChartComponent,
    JsonTableComponent,
    StackedChartComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
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
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    DxChartModule,
    CommonModule,
    HttpClientModule,
    DxSelectBoxModule,
    DxPieChartModule,
    DxSchedulerModule,
  ],
  providers: [ScreenService, AppInfoService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
