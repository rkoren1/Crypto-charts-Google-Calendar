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
  selectedRows: OblikaPodatkov[] = [];
  tableHeaders: string[] = [];

  constructor(
    private storeFacadeService: StoreFacadeService,
    private router: Router
  ) {}
  selectanaGroupa(e: any) {
    this.dataGrid.instance.clearGrouping();
    this.dataGrid.instance.columnOption(e.itemData, 'groupIndex', 0);
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

    var colCount = 0,
      colNames = [];
    for (var i = 0; i < this.dataGrid.instance.columnCount(); i++) {
      if (this.dataGrid.instance.columnOption(i, 'groupIndex') > -1) {
        colCount++;
        colNames.push(this.dataGrid.instance.columnOption(i, 'dataField'));
      }
    }
    this.storeFacadeService.setSelectedGroups(colNames);
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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
