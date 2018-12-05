import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../store';
import {logoutUserAction} from '../store/actions/current-user.actions';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, private router: Router, private ngRedux: NgRedux<AppState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.ngRedux.dispatch(logoutUserAction());
        this.router.navigate(['/main']);
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
