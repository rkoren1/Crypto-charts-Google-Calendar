import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { SectorsComponent } from './sectors/sectors.component';
import { ChannelsComponent } from './channels/channels.component';

const routes: Routes = [
  {
    path: 'charts',
    component: SectorsComponent,
  },
  {
    path: 'datagrid',
    component: ChannelsComponent,
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
