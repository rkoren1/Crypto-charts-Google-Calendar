import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';

export interface Data {
  data: OblikaPodatkov[];
}

export interface OblikaPodatkov {
  id: number;
  symbol: string;
  name: string;
  nameid: string;
  rank: number;
  price_usd: number;
  percent_change_24h: number;
  percent_change_1h: number;
  percent_change_7d: number;
  price_btc: number;
  market_cap_usd: number;
  volume24: number;
  volume24a: number;
  csupply: number;
  tsupply: number;
  msupply: number;
}

@Component({
  selector: 'app-jsonTable',
  templateUrl: './jsonTable.component.html',
  styleUrls: ['./jsonTable.component.scss'],
})
export class JsonTableComponent implements OnInit {
  dataUrl = 'https://api.coinlore.net/api/tickers/';

  podatki: OblikaPodatkov[] = [];

  getData() {
    this.http.get<Data>(this.dataUrl).subscribe((resp) => {
      resp.data.forEach((element) => this.podatki.push(element));
    });
  }

  constructor(private http: HttpClient) {


  }

  ngOnInit() {
    this.getData();
  }
}
