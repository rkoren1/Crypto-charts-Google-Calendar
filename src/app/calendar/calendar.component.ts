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
  test1 = [
    {
      kind: 'calendar#event',
      etag: '"3284294235172000"',
      id: '0f1pe6i1hb5b9mv40msv2nvb0i',
      status: 'confirmed',
      htmlLink:
        'https://www.google.com/calendar/event?eid=MGYxcGU2aTFoYjViOW12NDBtc3YybnZiMGkgbmpkbWpraTJicGFwazdvMWVjNGJkODNkdnNAZw',
      created: '2022-01-14T07:58:37.000Z',
      updated: '2022-01-14T07:58:37.586Z',
      summary: 'test2',
      creator: {
        email: 'rok.koren2@gmail.com',
      },
      organizer: {
        email: 'njdmjki2bpapk7o1ec4bd83dvs@group.calendar.google.com',
        displayName: 'CalendarApp',
        self: true,
      },
      start: {
        dateTime: '2022-01-17T09:00:00+01:00',
        timeZone: 'Europe/Belgrade',
      },
      end: {
        dateTime: '2022-01-17T10:00:00+01:00',
        timeZone: 'Europe/Belgrade',
      },
      iCalUID: '0f1pe6i1hb5b9mv40msv2nvb0i@google.com',
      sequence: 0,
      eventType: 'default',
    },
    {
      kind: 'calendar#event',
      etag: '"3284850500874000"',
      id: 'bcvtpam5uurdsoq43p9031nsps',
      status: 'confirmed',
      htmlLink:
        'https://www.google.com/calendar/event?eid=YmN2dHBhbTV1dXJkc29xNDNwOTAzMW5zcHMgbmpkbWpraTJicGFwazdvMWVjNGJkODNkdnNAZw',
      created: '2022-01-17T13:14:10.000Z',
      updated: '2022-01-17T13:14:10.437Z',
      summary: 'gfhgf',
      description: 'gfhgf',
      creator: {
        email: 'rok.koren2@gmail.com',
      },
      organizer: {
        email: 'njdmjki2bpapk7o1ec4bd83dvs@group.calendar.google.com',
        displayName: 'CalendarApp',
        self: true,
      },
      start: {
        dateTime: '2022-01-21T00:00:00+01:00',
        timeZone: 'Europe/Belgrade',
      },
      end: {
        dateTime: '2022-01-21T10:00:00+01:00',
        timeZone: 'Europe/Belgrade',
      },
      iCalUID: 'bcvtpam5uurdsoq43p9031nsps@google.com',
      sequence: 0,
      eventType: 'default',
    },
    {
      kind: 'calendar#event',
      etag: '"3284895919276000"',
      id: '663orbnf93oc4f28qbp2dvisns',
      status: 'confirmed',
      htmlLink:
        'https://www.google.com/calendar/event?eid=NjYzb3JibmY5M29jNGYyOHFicDJkdmlzbnMgbmpkbWpraTJicGFwazdvMWVjNGJkODNkdnNAZw',
      created: '2022-01-17T19:32:39.000Z',
      updated: '2022-01-17T20:32:39.638Z',
      summary: '657657',
      description: '567657',
      creator: {
        email: 'rok.koren2@gmail.com',
      },
      organizer: {
        email: 'njdmjki2bpapk7o1ec4bd83dvs@group.calendar.google.com',
        displayName: 'CalendarApp',
        self: true,
      },
      start: {
        dateTime: '2022-01-20T00:00:00+01:00',
        timeZone: 'Europe/Belgrade',
      },
      end: {
        dateTime: '2022-01-20T00:00:00+01:00',
        timeZone: 'Europe/Belgrade',
      },
      iCalUID: '663orbnf93oc4f28qbp2dvisns@google.com',
      sequence: 0,
      eventType: 'default',
    },
    {
      kind: 'calendar#event',
      etag: '"3284896403552000"',
      id: 'lun561s6500lfrl468i2mld8nc',
      status: 'confirmed',
      htmlLink:
        'https://www.google.com/calendar/event?eid=bHVuNTYxczY1MDBsZnJsNDY4aTJtbGQ4bmMgbmpkbWpraTJicGFwazdvMWVjNGJkODNkdnNAZw',
      created: '2022-01-17T19:36:41.000Z',
      updated: '2022-01-17T19:36:41.776Z',
      summary: '567567',
      description: '56765765',
      creator: {
        email: 'rok.koren2@gmail.com',
      },
      organizer: {
        email: 'njdmjki2bpapk7o1ec4bd83dvs@group.calendar.google.com',
        displayName: 'CalendarApp',
        self: true,
      },
      start: {
        dateTime: '2022-01-19T00:00:00+01:00',
        timeZone: 'Europe/Belgrade',
      },
      end: {
        dateTime: '2022-01-20T00:00:00+01:00',
        timeZone: 'Europe/Belgrade',
      },
      iCalUID: 'lun561s6500lfrl468i2mld8nc@google.com',
      sequence: 0,
      eventType: 'default',
    },
  ];
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
            newItem.endDate = new Date(newItem.end.date).toLocaleString();
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
}
