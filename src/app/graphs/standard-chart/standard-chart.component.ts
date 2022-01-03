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
  prikaziGraf = false;
  podatki: OblikaPodatkov[] = [];
  subscription!: Subscription;
  constructor(private storeFacadeService: StoreFacadeService) {}


  ngOnInit(): void {
    this.subscription = this.storeFacadeService.getSelectedData$.subscribe(
      (grafPodatki) => {
        this.podatki = grafPodatki;
      }
    );
    if (this.podatki == null && this.podatki == undefined) this.prikaziGraf = false;
    else this.prikaziGraf = true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
