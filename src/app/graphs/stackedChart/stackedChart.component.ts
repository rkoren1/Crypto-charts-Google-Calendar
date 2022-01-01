import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OblikaPodatkov } from 'src/app/Store/interfaces/datagrid.model';
import { StoreFacadeService } from 'src/app/Store/store-facade.service';

@Component({
  selector: 'app-stackedChart',
  templateUrl: './stackedChart.component.html',
  styleUrls: ['./stackedChart.component.scss']
})
export class StackedChartComponent implements OnInit, OnDestroy {

  prikaziGraf = false;
  podatki: OblikaPodatkov[] = [];
  subscription!: Subscription;

  constructor(private storeFacadeService: StoreFacadeService) { }

  ngOnInit() {
    this.subscription = this.storeFacadeService.selectData$.subscribe(
      (grafPodatki) => {
        this.podatki = grafPodatki;
      }
    );
    if (this.podatki.length === 0) this.prikaziGraf = false;
    else this.prikaziGraf = true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
