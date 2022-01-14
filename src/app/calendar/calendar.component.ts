import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  private getData(options: any, requestOptions: any) {
    const PUBLIC_KEY = 'AIzaSyB7xtRv85QdFium7U2-aoYLqUhzHS_xpaM';
    const CALENDAR_ID = 'njdmjki2bpapk7o1ec4bd83dvs@group.calendar.google.com';
    const dataUrl = [
      'https://www.googleapis.com/calendar/v3/calendars/',
      CALENDAR_ID,
      '/events?key=',
      PUBLIC_KEY,
    ].join('');

    return this.http
      .get(dataUrl, requestOptions)
      .toPromise()
      .then((data: any) => data.items);
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
}
