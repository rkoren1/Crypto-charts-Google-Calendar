import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreFacadeService } from '../Store/store-facade.service';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.scss'],
})
export class SectorsComponent implements OnInit {
  prikaziGrafe: boolean = false;
  groups: string = '';
  xAxis: string = '';
  yAxis: string = '';
  xSubscription!: Subscription;
  ySubscription!: Subscription;
  groupedFieldSubscrition!: Subscription;
  showStackedChart: boolean = false;
  showStandardChart: boolean = false;

  constructor(private storeFacadeService: StoreFacadeService) {}

  ngOnInit() {
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
        if (grupe !== undefined) this.groups = grupe[0];
      });
    //prikaze stackedChart
    if (
      this.groups !== '' &&
      this.groups !== undefined &&
      this.xAxis !== '' &&
      this.yAxis !== ''
    ) {
      this.prikaziGrafe = false;
      this.showStandardChart = false;
      this.showStackedChart = true;
    } //prikaze standardChart
    else if (
      this.xAxis !== '' &&
      this.yAxis !== '' &&
      (this.groups === '' || this.groups === undefined)
    ) {
      this.prikaziGrafe = false;
      this.showStackedChart = false;
      this.showStandardChart = true;
    } //prikaze opozorilo
    else {
      this.showStandardChart = false;
      this.showStackedChart = false;
      this.prikaziGrafe = true;
    }
  }

  ngOnDestroy() {
    this.xSubscription.unsubscribe();
    this.ySubscription.unsubscribe();
    this.groupedFieldSubscrition.unsubscribe();
  }
}
