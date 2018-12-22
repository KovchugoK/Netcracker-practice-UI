import {Injectable} from '@angular/core';
import {AnyAction} from 'redux';
import {ActionsObservable} from 'redux-observable';
import {of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {
  LOGIN_USER,
  loginUserFailedAction,
  LOGOUT_USER,
  UPDATE_BALANCE,
  updateBalanceSuccessAction,
  updateCurrentUserAction
} from '../actions/current-user.actions';
import {AuthenticationService} from '../../services/authentication.service';
import {GlobalUserStorageService} from '../../services/global-storage.service';
import {AccountService} from '../../services/account.service';

@Injectable()
export class CurrentUserEpic {
  constructor(private authService: AuthenticationService, private localStorageService: GlobalUserStorageService,
              private accountService: AccountService) {
  }

  loginUser$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(LOGIN_USER).pipe(
      switchMap(({payload}) => {
        return this.authService
          .login(payload.credential)
          .pipe(
            map(user => {
              this.localStorageService.currentUser = {...user};
              return updateCurrentUserAction(user);
            }), catchError(error => of(loginUserFailedAction(error)))
          );
      })
    );
  };

  logout$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(LOGOUT_USER).pipe(
      switchMap(({}) => {
        this.localStorageService.currentUser = null;
        return of(updateCurrentUserAction(null));
      })
    );
  };

  updateBalance$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(UPDATE_BALANCE).pipe(
      switchMap(({payload}) => {
        return this.accountService
          .updateAccountBalance(payload.accountId, payload.currentBalance)
          .pipe(
            map(balance => {
              this.localStorageService.currentUser = {
                ...this.localStorageService.currentUser,
                account: {...this.localStorageService.currentUser.account, balance: balance}
              };
              return updateBalanceSuccessAction(balance);
            }),
            catchError(error => error)
          );
      })
    );
  };

}
