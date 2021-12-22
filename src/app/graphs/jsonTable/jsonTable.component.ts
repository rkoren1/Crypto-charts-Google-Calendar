import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';

export interface ExchangeRates {
  rates: any;
}

export interface OblikaPodatkov {
  name: string;
  type: string;
  unit: string;
  value: number;
}

@Component({
  selector: 'app-jsonTable',
  templateUrl: './jsonTable.component.html',
  styleUrls: ['./jsonTable.component.scss'],
})
export class JsonTableComponent implements OnInit {
  dataStore!: OblikaPodatkov;
  dataUrl = 'https://api.coingecko.com/api/v3/exchange_rates';

  dataSource: any;
  objekt: any;

  getConfig() {
    // now returns an Observable of Config
    return this.http.get<ExchangeRates>(this.dataUrl);
  }

  showExchangeRates() {
    this.http
      .get<any>(this.dataUrl)
      // resp is of type `HttpResponse<Config>`
      .subscribe((resp) => {
        // display its headers
        this.dataSource = resp.rates;
        //console.log(Object.keys(resp.rates));
        //console.log(typeof Object.keys(resp.rates));
        //bject.keys(resp.rates).forEach(element => console.log(element));
        //Object.keys(resp.rates).forEach(btc => console.log(resp.rates.btc));
        console.log(resp.rates);
        JSON.parse(JSON.stringify(resp.rates), (key, value) => {
          console.log(value.name); // log the current property name, the last is "".
          return value; // return the unchanged property value.
        });
        this.objekt = JSON.parse(resp.rates);
        console.log(this.objekt);
        
      });
  }

  constructor(private http: HttpClient) {
    // ===== or inside the DataSource =====
    this.dataSource = new DataSource({
      // ...
      // a mix of CustomStore and DataSource properties
      // ...
    });
  }

  ngOnInit() {
    this.showExchangeRates();
  }
}
