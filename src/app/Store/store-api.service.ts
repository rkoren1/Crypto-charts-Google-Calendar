import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { store } from './store.state';

@Injectable({
  providedIn: 'root',
})
export class StoreApiService {
  apiUrl = 'https://api.coinlore.net/api/tickers/';

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<any>(this.apiUrl);
  }
}
