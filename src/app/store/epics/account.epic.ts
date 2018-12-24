import {Injectable} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../index';
import {catchError, map, switchMap} from "rxjs/operators";
import {AnyAction} from "redux";
import {ActionsObservable} from "redux-observable";
import {
  DELETE_ACCOUNT,
  deleteAccountSuccessAction, fetchAccountFailedAction,
  UPDATE_ACCOUNT,
  updateAccountSuccessAction
} from "../actions/accounts.actions";
import {of} from "rxjs";
import {SELECT_ACCOUNT, selectAccountSuccess} from "../actions/account-state.actions";
import {defaultAccount} from "../../model/Account";



@Injectable()
export class AccountEpic {
  constructor(private accountService: AccountService, private ngRedux: NgRedux<AppState>) {
  }

  updateAccount$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(UPDATE_ACCOUNT).pipe(
      switchMap(({payload}) => {
        console.log("update epic");
        console.log(payload.account);
        return this.accountService
          .updateAccount(payload.account)
          .pipe(
            map(account => updateAccountSuccessAction(account))
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
            map(() => deleteAccountSuccessAction(payload.accountId))
          );
      })
    );
  };

  selectAccount$ = (action$: ActionsObservable<AnyAction>) => {
    console.log("hello from epic");
    return action$.ofType(SELECT_ACCOUNT).pipe(
      switchMap(({payload}) => {
        return payload.accountId !== null ?
          this.accountService
            .findAccountById(payload.accountId)
            .pipe(
              map(account => selectAccountSuccess(account)),
              catchError(error => of(fetchAccountFailedAction(error.message)))
            )
          : of(defaultAccount)
            .pipe(
              map(account => selectAccountSuccess(account)),
              catchError(error => of(fetchAccountFailedAction(error.message)))
            );
      })
    );
  };

}

