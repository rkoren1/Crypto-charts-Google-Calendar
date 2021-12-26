import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StoreFacadeService } from '../../Store/store-facade.service';
import { OblikaPodatkov } from '../../Store/store.state';

@Component({
  selector: 'app-jsonTable',
  templateUrl: './jsonTable.component.html',
  styleUrls: ['./jsonTable.component.scss'],
})
export class JsonTableComponent implements OnInit {
  dataUrl = 'https://api.coinlore.net/api/tickers/';

  podatki: OblikaPodatkov[] = [];

  constructor(
    private http: HttpClient,
    private storeFacadeService: StoreFacadeService
  ) {}

  ngOnInit() {
    this.storeFacadeService.getData();
    this.storeFacadeService.selectData$.subscribe((data) =>
      data.forEach((data1) => this.podatki.push(data1))
    );
  }
}
