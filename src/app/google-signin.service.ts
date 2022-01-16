import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleSigninService {
  private auth2!: gapi.auth2.GoogleAuth;
  private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1);

  constructor() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '379646810701-pd2bq1jpqrcjtq8gvqker5htaugaa8ub.apps.googleusercontent.com',
      });
    });
  }
  
  public signIn() {
    this.auth2
      .signIn({
        scope:
          'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
      })
      .then((user) => {
        this.subject.next(user);
      })
      .catch(() => {
        this.subject.next(undefined);
      });
  }
  public signOut() {
    this.auth2.signOut().then(() => {});
  }

  public observable(): Observable<gapi.auth2.GoogleUser> {
    return this.subject.asObservable();
  }
  displayToken()
  {
    console.log(this.auth2);
  }
}
