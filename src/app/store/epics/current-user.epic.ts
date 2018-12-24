import { Injectable } from '@angular/core';
import { AnyAction } from 'redux';
import { ActionsObservable } from 'redux-observable';
import { of } from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {
  LOGIN_USER,
  loginUserFailedAction,
  LOGOUT_USER,
  updateCurrentUserAction,
  VERIFY_USER_EMAIL
} from '../actions/current-user.actions';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user.service';
import {GlobalUserStorageService} from '../../services/global-storage.service';
import {updateAccountSuccessAction} from "../actions/accounts.actions";

@Injectable()
export class CurrentUserEpic {
  constructor(private authService: AuthenticationService, private localStorageService: GlobalUserStorageService,
              private  userService: UserService) { }

  loginUser$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(LOGIN_USER).pipe(
      switchMap(({ payload }) => {
        return this.authService
          .login(payload.credential)
          .pipe(
            map(user => {
              this.localStorageService.currentUser = { ...user };
              return updateCurrentUserAction(user);
            }), catchError(error => of(loginUserFailedAction(error)))
          );
      })
    );
  }

  logout$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(LOGOUT_USER).pipe(
      switchMap(({ }) => {
        this.localStorageService.currentUser = null;
        return of(updateCurrentUserAction(null));
      })
    );
  }

  // verifyUserEmail$ = (action$: ActionsObservable<AnyAction>) => {
  //   return action$.ofType(VERIFY_USER_EMAIL).pipe(
  //     switchMap(({ payload }) => {
  //       return this.userService
  //         .verifyEmail(payload)
  //         .pipe(
  //           map(account => updateAccountSuccessAction(account))
  //         );
  //     })
  //   );
  // }

}
