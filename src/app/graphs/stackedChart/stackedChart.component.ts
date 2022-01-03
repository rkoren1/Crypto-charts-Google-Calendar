import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { OblikaPodatkov } from 'src/app/Store/interfaces/datagrid.model';
import { StoreFacadeService } from 'src/app/Store/store-facade.service';

@Component({
  selector: 'app-stackedChart',
  templateUrl: './stackedChart.component.html',
  styleUrls: ['./stackedChart.component.scss'],
})
export class StackedChartComponent implements OnInit, OnDestroy {
  prikaziGraf = false;
  podatki: OblikaPodatkov[] = [];
  subscription!: Subscription;

  constructor(private storeFacadeService: StoreFacadeService) {}
  groups: string[] = [];
  groupedData: any[] = [];

  getUniqueGroups(imePolja: any) {
    let arrayVseh: any[] = [];
    this.podatki.forEach((element) => {
      arrayVseh.push(element[imePolja]);
    });
    let unique = [...new Set(arrayVseh)];
    return unique;
  }
  getUniqueData(uniqGroups: string[]) {
    let groupiraniPodatki: any[] = [];
    var result = this.podatki.reduce(function (r, a) {
      r[a.percent_change_24h] = r[a.percent_change_24h] || [];
      r[a.percent_change_24h].push(a);
      return r;
    }, Object.create(null));
    return result;
  }

  ngOnInit() {
    this.subscription = this.storeFacadeService.selectData$.subscribe(
      (grafPodatki) => {
        this.podatki = grafPodatki;
      }
    );
    if (this.podatki.length === 0) this.prikaziGraf = false;
    else this.prikaziGraf = true;
    this.groups = this.getUniqueGroups('percent_change_24h');
    this.groupedData = this.getUniqueData(['percent_change_24h']);
    console.log(this.groupedData);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
