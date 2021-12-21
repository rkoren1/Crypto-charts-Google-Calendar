import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jsonTable',
  templateUrl: './jsonTable.component.html',
  styleUrls: ['./jsonTable.component.scss'],
})
export class JsonTableComponent implements OnInit {
  dataStore: any;

  constructor() {}

  ngOnInit() {
}
}
