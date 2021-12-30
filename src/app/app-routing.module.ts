import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { SectorsComponent } from './sectors/sectors.component';
import { ChannelsComponent } from './channels/channels.component';

const routes: Routes = [
  {
    path: 'sectors',
    component: SectorsComponent
  },
  {
    path: 'channels',
    component: ChannelsComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), DxDataGridModule, DxFormModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
