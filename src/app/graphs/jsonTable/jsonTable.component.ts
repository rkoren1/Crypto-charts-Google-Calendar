import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
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
  selectedRowsData: OblikaPodatkov[] = [];
  selectedRows: OblikaPodatkov[] = [];

  constructor(
    private storeFacadeService: StoreFacadeService,
    private router: Router
  ) {}
  contentReady() {
    this.subscription = this.storeFacadeService.getSelectedData$.subscribe(
      (selectaneVrstice) => {
        this.selectedRows = selectaneVrstice;
      }
    );
  }
  drawChart() {
    this.storeFacadeService.setSelectedData(
      this.dataGrid.instance.getSelectedRowsData()
    );
    this.selectedRowsData = this.dataGrid.instance.getSelectedRowsData();
  }
  selectedIds: OblikaPodatkov[] = [];
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
