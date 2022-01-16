import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { GoogleSigninService } from '../google-signin.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  dataSource: DataSource;
  user!: gapi.auth2.GoogleUser;
  dataUrl = [
    'https://www.googleapis.com/calendar/v3/calendars/',
    'njdmjki2bpapk7o1ec4bd83dvs@group.calendar.google.com',
    '/events?key=',
    'AIzaSyB7xtRv85QdFium7U2-aoYLqUhzHS_xpaM',
  ].join('');

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

  constructor(
    private http: HttpClient,
    private signInService: GoogleSigninService,
    private ref: ChangeDetectorRef
  ) {
    this.dataSource = new DataSource({
      store: new CustomStore({
        load: (options) => this.getData(options, { showDeleted: false }),
        insert: (values) => {
          console.log(values);
          return this.http
            .post(this.dataUrl, JSON.stringify(values))
            .toPromise()
            .catch(() => {
              throw 'Insertion failed';
            });
        },
      }),
    });
  }
  onAppointmentAdded(e: any) {
    console.log(e.appointmentData);
  }

  ngOnInit(): void {
    this.signInService.observable().subscribe((user) => {
      this.user = user;
      this.ref.detectChanges();
    });
  }

  signIn() {
    if (this.user == null) this.signInService.signIn();
  }
  signOut() {
    this.signInService.signOut();
  }
  test() {
    console.log('dela');
  }
}
