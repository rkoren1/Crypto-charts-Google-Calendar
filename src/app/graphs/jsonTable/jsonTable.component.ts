import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable } from 'rxjs';

@Component({
  selector: 'app-jsonTable',
  templateUrl: './jsonTable.component.html',
  styleUrls: ['./jsonTable.component.scss'],
})
export class JsonTableComponent implements OnInit {
  dataStore: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<any>('https://jsonplaceholder.typicode.com/posts')
      .subscribe((data) => {
        console.log(JSON.stringify(data));
      });
  }
}
