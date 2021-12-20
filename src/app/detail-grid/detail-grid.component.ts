import { Component, Input, AfterViewInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';

@Component({
  selector: 'detail-grid',
  templateUrl: './detail-grid.component.html',
  styleUrls: ['./detail-grid.component.scss'],
  providers: [],
})
export class DetailGridComponent implements AfterViewInit {
  @Input() key: number= 0;

  dataSource: DataSource | any;

  ngAfterViewInit() {
    this.dataSource = new DataSource({
      store: AspNetData.createStore({
        loadUrl: 'https://js.devexpress.com/Demos/Mvc/api/DataGridWebApi/OrderDetails',
        loadParams: { orderID: this.key },
        onBeforeSend(method, ajaxOptions) {
          ajaxOptions.xhrFields = { withCredentials: true };
        },
      }),
    });
  }
  
}
