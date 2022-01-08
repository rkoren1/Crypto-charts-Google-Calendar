import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent, DxSelectBoxComponent } from 'devextreme-angular';
import dxDataGrid from 'devextreme/ui/data_grid';
import { Subscription } from 'rxjs';
import { OblikaPodatkov } from 'src/app/Store/interfaces/datagrid.model';
import { StoreFacadeService } from '../../Store/store-facade.service';

@Component({
  selector: 'app-jsonTable',
  templateUrl: './jsonTable.component.html',
  styleUrls: ['./jsonTable.component.scss'],
})
export class JsonTableComponent implements OnInit, OnDestroy {
  podatki: OblikaPodatkov[] = [];
  subscription!: Subscription;
  @ViewChild('dataGridRef', { static: false }) dataGrid!: DxDataGridComponent;
  @ViewChild('groupingSelectBoxRef', { static: false })
  groupingBox!: DxSelectBoxComponent;
  @ViewChild('xBoxRef', { static: false }) xBox!: DxSelectBoxComponent;
  @ViewChild('yBoxRef', { static: false }) yBox!: DxSelectBoxComponent;
  selectedRows: OblikaPodatkov[] = [];
  tableHeaders: string[] = [];
  xAxis: string = '';
  yAxis: string = '';
  xSubscription!: Subscription;
  ySubscription!: Subscription;
  groups: string[] = [];

  constructor(
    private storeFacadeService: StoreFacadeService,
    private router: Router
  ) {}
  selectanaGroupa(e: any) {
    this.dataGrid.instance.clearGrouping();
    this.dataGrid.instance.columnOption(e.itemData, 'groupIndex', 0);
    this.storeFacadeService.setSelectedGroups(e.itemData);
  }
  selectanX(e: any) {
    this.storeFacadeService.setSelectedX(e.itemData);
  }
  selectanY(e: any) {
    this.storeFacadeService.setSelectedY(e.itemData);
  }

  onContentReady(e: dxDataGrid) {
    this.subscription = this.storeFacadeService.getSelectedData$.subscribe(
      (selectaneVrstice) => {
        this.selectedRows = selectaneVrstice;
      }
    );
    //fills grouping selector
    if (this.podatki.length != 0) {
      this.tableHeaders.push('');
      this.tableHeaders.push(...this.getTableHeaders(this.podatki));
    }

    //fills x and y selectboxes
    this.xBox.instance.option('value', this.xAxis);
    this.yBox.instance.option('value', this.yAxis);

    //gets groups from datagrid
    var colNames = [];
    for (var i = 0; i < this.dataGrid.instance.columnCount(); i++) {
      if (this.dataGrid.instance.columnOption(i, 'groupIndex') > -1) {
        colNames.push(this.dataGrid.instance.columnOption(i, 'dataField'));
      }
    }
    this.groups = colNames;
    //this.groups = this.dataGrid.instance.getDataSource().group()[0].selector;
    //saves groups into store
    this.storeFacadeService.setSelectedGroups(this.groups);
    //sets grouping selectbox value
    this.groupingBox.instance.option('value', this.groups[0]);

    //console.log(this.dataGrid.instance.getDataSource().items());
    //console.log(this.dataGrid.instance.getDataSource().group());
  }

  getTableHeaders(tabelaPodatkov: OblikaPodatkov[]) {
    let arrayStringov: string[] = [];
    arrayStringov = Object.keys(tabelaPodatkov[0]);
    return arrayStringov;
  }

  drawChart() {
    this.storeFacadeService.setSelectedData(
      this.dataGrid.instance.getSelectedRowsData()
    );
  }

  ngOnInit() {
    this.storeFacadeService.getData();
    this.subscription = this.storeFacadeService.selectData$.subscribe(
      (data) => (this.podatki = data)
    );
    this.xSubscription = this.storeFacadeService.getSelectedX$.subscribe(
      (xOs) => {
        if (xOs !== undefined) this.xAxis = xOs;
      }
    );
    this.ySubscription = this.storeFacadeService.getSelectedY$.subscribe(
      (yOs) => {
        if (yOs !== undefined) this.yAxis = yOs;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.ySubscription.unsubscribe();
    this.xSubscription.unsubscribe();
  }
}
