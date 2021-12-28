import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreFacadeService } from '../../Store/store-facade.service';
import { OblikaPodatkov } from '../../Store/store.state';

@Component({
  selector: 'app-standard-chart',
  templateUrl: './standard-chart.component.html',
  styleUrls: ['./standard-chart.component.scss'],
})
export class StandardChartComponent implements OnInit, OnDestroy {
  prikaziGraf = false;
  constructor(private storeFacadeService: StoreFacadeService) {}
  podatki: OblikaPodatkov[] = [];
  subscription!: Subscription;
  ngOnInit(): void {
    this.storeFacadeService.getData();
    this.subscription = this.storeFacadeService.getSelectedData$.subscribe(
      (data) => {
        data.forEach((data1) => this.podatki.push(data1));
      }
    )
    if (this.podatki.length === 0)
      this.prikaziGraf = false;
     else
      this.prikaziGraf = true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
