import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  dataSource: DataSource;
  isSignedIn: boolean = false;

  private getData(options: any, requestOptions: any) {
    const PUBLIC_KEY = 'AIzaSyB7xtRv85QdFium7U2-aoYLqUhzHS_xpaM';
    const CALENDAR_ID = 'njdmjki2bpapk7o1ec4bd83dvs@group.calendar.google.com';
    const dataUrl = [
      'https://www.googleapis.com/calendar/v3/calendars/',
      CALENDAR_ID,
      '/events?key=',
      PUBLIC_KEY,
    ].join('');
    {
    }
    return this.http
      .get(dataUrl, requestOptions)
      .toPromise()
      .then((data: any) => {
        let newData = data.items.map((val: any) => {
          if (val?.end?.date) {
            const newItem = val;
            newItem['allDay'] = true;
            newItem.startDate = this.datePipe.transform(
              newItem.start.date,
              'yyyy-MM-ddTHH:mm:ssZ'
            );
            newItem.endDate = this.datePipe.transform(
              newItem.end.date,
              'yyyy-MM-ddTHH:mm:ssZ'
            );
            newItem.startDate = new Date(newItem.start.date).toLocaleString();
            newItem.endDate = new Date(newItem.end.date);

            newItem.endDate.setDate(newItem.endDate.getDate() - 1);

            newItem.endDate = newItem.endDate.toLocaleString();
            return newItem;
          } else {
            const newItem = val;
            newItem['allDay'] = false;
            newItem.startDate = this.datePipe.transform(
              newItem.start.dateTime,
              'yyyy-MM-ddTHH:mm:ssZ'
            );
            newItem.endDate = this.datePipe.transform(
              newItem.end.dateTime,
              'yyyy-MM-ddTHH:mm:ssZ'
            );
            newItem.endDate = new Date(newItem.end.dateTime).toLocaleString();
            newItem.startDate = new Date(
              newItem.start.dateTime
            ).toLocaleString();
            return newItem;
          }
        });
        return /* this.test1;  */ newData;
      });
  }

  constructor(private http: HttpClient, private datePipe: DatePipe) {
    this.dataSource = new DataSource({
      store: new CustomStore({
        load: (options) => {
          return this.getData(options, { showDeleted: false });
        },
        insert: (values) => {
          if (values?.allDay) {
            values.end = {};
            values.end.date = datePipe.transform(values.endDate, 'yyyy-MM-dd');
            values.start = {};
            values.start.date = datePipe.transform(
              values.startDate,
              'yyyy-MM-dd'
            );
          } else {
            values.end = {};
            values.end.dateTime = values.endDate;
            values.start = {};
            values.start.dateTime = values.startDate;
          }
          delete values.startDate;
          delete values.endDate;
          delete values.allDay;
          return gapi.client.calendar.events
            .insert({
              calendarId:
                'njdmjki2bpapk7o1ec4bd83dvs@group.calendar.google.com',
              resource: values,
            })
            .then(
              function (response) {
                // Handle the results here (response.result has the parsed body).
                //console.log('Response', response);
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
                //console.log('Response', response);
              },
              function (err) {
                console.error('Execute error', err);
              }
            );
        },
        update: (key, values) => {
          if (values?.allDay) {
            values.end = {};
            values.end.date = datePipe.transform(values.endDate, 'yyyy-MM-dd');
            values.start = {};
            values.start.date = datePipe.transform(
              values.startDate,
              'yyyy-MM-dd'
            );
          } else {
            values.end = {};
            values.end.dateTime = values.endDate;
            values.start = {};
            values.start.dateTime = values.startDate;
          }
          delete values.startDate;
          delete values.endDate;
          delete values.allDay;
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
                //console.log('Response', response);
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
    gapi.load('client:auth2', () => {
      gapi.auth2.init({
        client_id:
          '379646810701-pd2bq1jpqrcjtq8gvqker5htaugaa8ub.apps.googleusercontent.com',
      });
    });
  }

  test() {
    console.log('dela');
  }
  zeVpisan() {
    if (this.isSignedIn) return;
    this.authenticate().then(this.loadClient);
  }

  authenticate() {
    return gapi.auth2
      .getAuthInstance()
      .signIn({
        scope:
          'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
      })
      .then(
        () => {
          //console.log('Sign-in successful');
          this.isSignedIn = true;
        },
        (err) => {
          this.isSignedIn = false;
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
          //console.log('GAPI client loaded for API');
        },
        function (err) {
          console.error('Error loading GAPI client for API', err);
        }
      );
  }
  schedulerHeight()
  {
    return window.innerHeight-76;
  }
}
