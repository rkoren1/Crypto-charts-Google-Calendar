import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { SalesDashboardComponent } from './SalesDashboard/SalesDashboard.component';
import { ProductsComponent } from './products/products.component';
import { SectorsComponent } from './sectors/sectors.component';
import { RegionsComponent } from './regions/regions.component';
import { ChannelsComponent } from './channels/channels.component';
import { GeographyComponent } from './geography/geography.component';
import { DailySalesComponent } from './dailySales/dailySales.component';



const routes: Routes = [
  {
    path: 'salesDashboard',
    component: SalesDashboardComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'sectors',
    component: SectorsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'regions',
    component: RegionsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'channels',
    component: ChannelsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'geography',
    component: GeographyComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'dailySales',
    component: DailySalesComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), DxDataGridModule, DxFormModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
})
export class AppRoutingModule { }
