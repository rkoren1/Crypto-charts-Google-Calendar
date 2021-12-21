import { NgModule, Component, enableProdMode, ViewChild, OnInit  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxDataGridComponent, DxDataGridModule } from 'devextreme-angular';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import { DetailGridComponent } from '../detail-grid/detail-grid.component';

import { DxChartModule } from 'devextreme-angular';
import dxChart from 'devextreme/viz/chart';
import DataSource from 'devextreme/data/data_source';


if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-dailySales',
  templateUrl: './dailySales.component.html',
  styleUrls: ['./dailySales.component.scss']
})
export class DailySalesComponent implements OnInit{

  @ViewChild("dataGrid", {static: true}) datagrid!:DxDataGridComponent;
  @ViewChild("barChart", {static: true}) barChart!:dxChart;

  customersData: any;

  shippersData: any;

  dataSource: any;

  url: string;

  masterDetailDataSource: any;


  grafDataSource: any;

  filterValue:any;

  refreshGraf(e:any)
  {
    console.log(this.datagrid.instance.getCombinedFilter());
    //this.filterValue = this.datagrid.instance.getCombinedFilter();
    //this.grafDataSource.load();

    //this.grafDataSource = this.dat//aSource;
    //console.log("event dela", e);
  }
ngOnInit(): void {
}

  constructor() {
    this.url = 'https://js.devexpress.com/Demos/Mvc/api/DataGridWebApi';

    this.dataSource = AspNetData.createStore({
      key: 'OrderID',
      loadUrl: `${this.url}/Orders`,
      insertUrl: `${this.url}/InsertOrder`,
      updateUrl: `${this.url}/UpdateOrder`,
      deleteUrl: `${this.url}/DeleteOrder`,
      onBeforeSend(method, ajaxOptions) {
        ajaxOptions.xhrFields = { withCredentials: true };
      },
    });

    this.customersData = AspNetData.createStore({
      key: 'Value',
      loadUrl: `${this.url}/CustomersLookup`,
      onBeforeSend(method, ajaxOptions) {
        ajaxOptions.xhrFields = { withCredentials: true };
      },
    });

    this.shippersData = AspNetData.createStore({
      key: 'Value',
      loadUrl: `${this.url}/ShippersLookup`,
      onBeforeSend(method, ajaxOptions) {
        ajaxOptions.xhrFields = { withCredentials: true };
      },
    });
    this.grafDataSource = this.dataSource;
  }

}


