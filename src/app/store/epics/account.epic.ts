import {Injectable} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../index';
import {catchError, map, switchMap} from 'rxjs/operators';
import {AnyAction} from 'redux';
import {ActionsObservable} from 'redux-observable';
import {
  DELETE_ACCOUNT,
  deleteAccountSuccessAction, fetchAccountFailedAction,
  UPDATE_ACCOUNT,
  updateAccountSuccessAction
} from '../actions/accounts.actions';
import {of} from 'rxjs';
import {SELECT_ACCOUNT, selectAccountSuccess} from '../actions/account-state.actions';
import {defaultAccount} from '../../model/Account';
import {NotifierService} from 'angular-notifier';



@Injectable()
export class AccountEpic {
  constructor(private accountService: AccountService, private ngRedux: NgRedux<AppState>,
              private notifierService: NotifierService) {
  }

  updateAccount$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(UPDATE_ACCOUNT).pipe(
      switchMap(({payload}) => {
        return this.accountService
          .updateAccount(payload.account)
          .pipe(
            map(account => {
              this.notifierService.notify('success', 'Account was updated successful');
              return updateAccountSuccessAction(account);
            }),
            catchError(error => {
              this.notifierService.notify('error', 'Account update failed');
              return of(fetchAccountFailedAction(error));
            })
          );

      })
    );
  };

  deleteAccount$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(DELETE_ACCOUNT).pipe(
      switchMap(({payload}) => {
        return this.accountService
          .deleteAccount(payload.accountId)
          .pipe(
            map(() => {
              this.notifierService.notify('success', 'Account was deleted successful');
              deleteAccountSuccessAction(payload.accountId);
            },
              catchError(error => {
                this.notifierService.notify('error', 'Account was not deleted');
                return of(fetchAccountFailedAction(error));
              })
          ));
      })
    );
  };

  selectAccount$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(SELECT_ACCOUNT).pipe(
      switchMap(({payload}) => {
        return payload.accountId !== null ?
          this.accountService
            .findAccountById(payload.accountId)
            .pipe(
              map(account => selectAccountSuccess(account)),
              catchError(error => of(fetchAccountFailedAction(error)))
            )
          : of(defaultAccount)
            .pipe(
              map(account => selectAccountSuccess(account)),
              catchError(error => of(fetchAccountFailedAction(error)))
            );
      })
    );
  };

}

