import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../model/User';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../store';
import {loadCurrentUserSuccessAction} from '../store/actions/user.actions';
import {tap} from 'rxjs/internal/operators';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private ngRedux: NgRedux<AppState>) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  login(login: string, password: string) {
    return this.http.post<any>(`/api/auth/signin`, {login, password})
      .pipe(tap(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.ngRedux.dispatch(loadCurrentUserSuccessAction(JSON.parse(localStorage.getItem('currentUser'))));
        }
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
