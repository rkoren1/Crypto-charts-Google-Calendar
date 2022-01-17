import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  dataSource: DataSource;
  //user!: gapi.auth2.GoogleUser;

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
      .then((data: any) => {
        return data.items;
      });
  }

  constructor(private http: HttpClient) {
    this.dataSource = new DataSource({
      store: new CustomStore({
        load: (options) => this.getData(options, { showDeleted: false }),
        insert: (values) => {
          return gapi.client.calendar.events
            .insert({
              calendarId:
                'njdmjki2bpapk7o1ec4bd83dvs@group.calendar.google.com',
              resource: values,
            })
            .then(
              function (response) {
                // Handle the results here (response.result has the parsed body).
                console.log('Response', response);
              },
              function (err) {
                console.error('Execute error', err);
              }
            );
        },
        remove: (key) => {
          return gapi.client.calendar.events
            .delete({
              calendarId:
                'njdmjki2bpapk7o1ec4bd83dvs@group.calendar.google.com',
              eventId: key.id,
            })
            .then(
              function (response) {
                // Handle the results here (response.result has the parsed body).
                console.log('Response', response);
              },
              function (err) {
                console.error('Execute error', err);
              }
            );
        },
        update: (key, values) => {
          return gapi.client.calendar.events
            .patch({
              calendarId:
                'njdmjki2bpapk7o1ec4bd83dvs@group.calendar.google.com',
              eventId: key.id,
              resource: values,
            })
            .then(
              function (response) {
                // Handle the results here (response.result has the parsed body).
                console.log('Response', response);
              },
              function (err) {
                console.error('Execute error', err);
              }
            );
        },
      }),
    });
  }

  ngOnInit(): void {
    gapi.load('client:auth2', function () {
      gapi.auth2.init({
        client_id:
          '379646810701-pd2bq1jpqrcjtq8gvqker5htaugaa8ub.apps.googleusercontent.com',
      });
    });
  }

  test() {
    console.log('dela');
  }

  authenticate() {
    return gapi.auth2
      .getAuthInstance()
      .signIn({
        scope:
          'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
      })
      .then(
        function () {
          console.log('Sign-in successful');
        },
        function (err) {
          console.error('Error signing in', err);
        }
      );
  }

  loadClient() {
    gapi.client.setApiKey('AIzaSyB7xtRv85QdFium7U2-aoYLqUhzHS_xpaM');
    return gapi.client
      .load(
        'https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest',
        'auth2'
      )
      .then(
        function () {
          console.log('GAPI client loaded for API');
        },
        function (err) {
          console.error('Error loading GAPI client for API', err);
        }
      );
  }

}
