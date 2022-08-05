import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { GraphsDisplayComponent } from './graphs-display/graphs-display.component';
import { CalendarComponent } from './calendar/calendar.component';
import { JsonTableComponent } from './jsonTable/jsonTable.component';

const routes: Routes = [
  {
    path: 'charts',
    component: GraphsDisplayComponent,
  },
  {
    path: 'datagrid',
    component: JsonTableComponent,
  },
  {
    path: 'calendar',
    component: CalendarComponent,
  },
  {
    path: '**',
    redirectTo: 'datagrid',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    DxDataGridModule,
    DxFormModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
