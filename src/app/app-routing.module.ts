import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { SectorsComponent } from './sectors/sectors.component';
import { DatagridComponent } from './datagrid/datagrid.component'; 
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  {
    path: 'charts',
    component: SectorsComponent,
  },
  {
    path: 'datagrid',
    component: DatagridComponent,
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
