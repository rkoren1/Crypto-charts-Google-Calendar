import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { Subscription } from 'rxjs';
import { StoreFacadeService } from '../../Store/store-facade.service';
import { OblikaPodatkov } from '../../Store/store.state';

@Component({
  selector: 'app-jsonTable',
  templateUrl: './jsonTable.component.html',
  styleUrls: ['./jsonTable.component.scss'],
})
export class JsonTableComponent implements OnInit, OnDestroy {
  podatki: OblikaPodatkov[] = [];
  subscription!: Subscription;
  @ViewChild('dataGridRef', { static: false }) dataGrid!: DxDataGridComponent;
  selectedRowsData = [];

  constructor(
    private storeFacadeService: StoreFacadeService,
    private router: Router
  ) {}

  drawChart() {
    this.storeFacadeService.setSelectedData(
      this.dataGrid.instance.getSelectedRowsData()
    );
    this.router.navigateByUrl('/sectors');
  }
  disablanButton = true;
  isItChecked() {
    if (this.dataGrid.instance.getSelectedRowsData().length === 0)
      this.disablanButton = true;
    else this.disablanButton = false;
  }
  ngOnInit() {
    this.storeFacadeService.getData();
    this.subscription = this.storeFacadeService.selectData$.subscribe((data) =>
      data.forEach((data1) => this.podatki.push(data1))
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
