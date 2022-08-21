import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OblikaPodatkov } from 'src/app/Store/interfaces/datagrid.model';
import { StoreFacadeService } from 'src/app/Store/store-facade.service';

@Component({
  selector: 'app-stacked-chart',
  templateUrl: './stacked-chart.component.html',
  styleUrls: ['./stacked-chart.component.scss'],
})
export class StackedChartComponent implements OnInit, OnDestroy {
  podatki: OblikaPodatkov[] = [];
  subscription!: Subscription;
  groups: string = '';
  groupedData: any[] = [];
  xAxis: string = '';
  yAxis: string = '';
  xSubscription!: Subscription;
  ySubscription!: Subscription;
  allDatasubscription!: Subscription;
  finalniPodatki!: any[];
  groupedFieldSubscrition!: Subscription;

  constructor(private storeFacadeService: StoreFacadeService) {}

  getUniqueGroups(imePolja: any) {
    let arrayVseh: any[] = [];
    this.podatki.forEach((element) => {
      arrayVseh.push(element[imePolja]);
    });
    let unique = [...new Set(arrayVseh)];
    return unique;
  }
  getUniqueData(uniqGroups: string[]) {
    var groupBy = this.podatki.reduce((objectsByKeyValue: any, obj) => {
      const value = obj[uniqGroups[0]];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});
    return groupBy;
  }

  groupByKey(array: any[], key: string | number) {
    return array.reduce((hash, obj) => {
      if (obj[key] === undefined) return hash;
      return Object.assign(hash, {
        [obj[key]]: (hash[obj[key]] || []).concat(obj),
      });
    }, {});
  }
  createFinalArray(
    data: any[],
    uniqGroups: string[],
    grupiranoPolje: string,
    osX: string,
    osY: string
  ) {
    let finalenArray: any[] = [];
    let objekt: any = {};
    uniqGroups.forEach((element: string) => {
      objekt[grupiranoPolje] = element;

      data[+element].forEach((vrednost: any) => {
        objekt[vrednost[osX]] = vrednost[osY];
      });
      finalenArray.push(objekt);
      objekt = {};
    });
    return finalenArray;
  }

  createFinalArray1(
    data: any[],
    grupiranoPolje: string,
    osX: string,
    osY: string
  ) {
    let finalenArray: any[] = [];
    let objekt: any = {};

    data.forEach((vrednost: any) => {
      objekt[grupiranoPolje] = vrednost[grupiranoPolje];
      objekt[vrednost[osX]] = vrednost[osY];
      objekt['vrednostX'] = vrednost[osX];
      finalenArray.push(objekt);
      objekt = {};
    });
    /*
    finalenArray.push({
      percent_change_24h: 0.1,
      ABC: 60000,
      vrednostX: 'ABC',
    });
    */
    return finalenArray;
  }

  ngOnInit() {
    this.subscription = this.storeFacadeService.getSelectedData$.subscribe(
      (grafPodatki) => {
        if (grafPodatki !== undefined) this.podatki = grafPodatki;
      }
    );
    if (this.podatki.length == 0) {
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
    this.groupedFieldSubscrition =
      this.storeFacadeService.getSelectedGroups$.subscribe((grupe) => {
        this.groups = grupe[0];
      });

    //this.groups = this.getUniqueGroups('percent_change_24h');
    //this.groupedData = this.groupByKey(this.podatki, 'percent_change_24h');
    this.finalniPodatki = this.createFinalArray1(
      this.podatki,
      this.groups,
      this.xAxis,
      this.yAxis
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.xSubscription.unsubscribe();
    this.ySubscription.unsubscribe();
    this.groupedFieldSubscrition.unsubscribe();
    if (this.allDatasubscription !== undefined)
      this.allDatasubscription.unsubscribe();
  }
}
