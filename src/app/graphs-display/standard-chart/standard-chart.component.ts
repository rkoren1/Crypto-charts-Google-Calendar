import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OblikaPodatkov } from 'src/app/Store/interfaces/datagrid.model';
import { StoreFacadeService } from '../../Store/store-facade.service';

@Component({
  selector: 'app-standard-chart',
  templateUrl: './standard-chart.component.html',
  styleUrls: ['./standard-chart.component.scss'],
})
export class StandardChartComponent implements OnInit, OnDestroy {
  podatki: OblikaPodatkov[] = [];
  subscription!: Subscription;
  xSubscription!: Subscription;
  ySubscription!: Subscription;
  allDatasubscription!: Subscription;
  xAxis: string = '';
  yAxis: string = '';
  chartName: string = '';
  constructor(private storeFacadeService: StoreFacadeService) {}

  ngOnInit(): void {
    this.subscription = this.storeFacadeService.getSelectedData$.subscribe(
      (grafPodatki) => {
        if (grafPodatki !== undefined) this.podatki = grafPodatki;
      }
    );
    if (this.podatki.length === 0) {
      this.allDatasubscription = this.storeFacadeService.selectData$.subscribe(
        (grafPodatki) => {
          this.podatki = grafPodatki;
        }
      );
    }

    this.xSubscription = this.storeFacadeService.getSelectedX$.subscribe(
      (xOs) => {
        this.xAxis = xOs;
      }
    );
    this.ySubscription = this.storeFacadeService.getSelectedY$.subscribe(
      (yOs) => {
        this.yAxis = yOs;
      }
    );
    this.chartName = this.xAxis + ' / ' + this.yAxis;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.xSubscription.unsubscribe();
    this.ySubscription.unsubscribe();
    if(this.allDatasubscription!= undefined)
    this.allDatasubscription.unsubscribe();
  }
  legendClickHandler(e: any)
  {
    const arg = e.target;
    const item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];

    this.toggleVisibility(item);
  }
  toggleVisibility(item: any) {
    if (item.isVisible()) {
      item.hide();
    } else {
      item.show();
    }
  }
  pointClickHandler(e:any)
  {
    this.toggleVisibility(e.target);
  }
  customizeLabel(arg: any)
  {
    return `${arg.argumentText}`;
  }
}
