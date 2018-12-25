import {Injectable} from '@angular/core';
import {
  FETCH_STARTUPS,
  fetchStartupsSuccessAction,
  fetchStartupsFailedAction,
  CREATE_STARTUP,
  createStartupSuccessAction,
  updateStartupSuccessAction,
  DELETE_STARTUP,
  deleteStartupSuccessAction,
  UPDATE_STARTUP,
  SEARCH_STARTUPS,
  searchStartupsSuccessAction
} from '../actions/startups.actions';
import {catchError, switchMap, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {ActionsObservable} from 'redux-observable';
import {AnyAction} from 'redux';
import {TransformService} from '../../utils/transform.service';
import {StartupService} from '../../services/startup.service';
import {
  CANCEL_RESUME_TO_STARTUP,
  cancelResumeToStartupSuccessAction,
  MAKE_INVESTMENT_IN_STARTUP, makeInvestmentInStartupSuccessAction,
  SELECT_STARTUP, selectStartupFailed,
  selectStartupSuccess,
  SEND_RESUME_TO_STARTUP,
  sendResumeToStartupSuccessAction
} from '../actions/startup-state.actions';
import {defaultStartup} from '../../model/Startup';
import {StartupResumeService} from '../../services/startup-resume.service';
import {AppState} from '../index';
import {NgRedux} from '@angular-redux/store';
import {updateBalanceAction} from '../actions/current-user.actions';
import {NotifierService} from 'angular-notifier';


@Injectable()
export class StartupEpic {
  constructor(private startupService: StartupService,
              private startupResumeService: StartupResumeService, private ngRedux: NgRedux<AppState>, private notifierService: NotifierService) {
  }

  fetchStartups$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(FETCH_STARTUPS).pipe(
      switchMap(({}) => {
        return this.startupService
          .getStartupList()
          .pipe(
            map(startups => fetchStartupsSuccessAction(TransformService.transformToMap(startups))),
            catchError(error => {
              this.notifierService.notify('error', 'Error while getting startups');
              return of(fetchStartupsFailedAction(error));
            })
          );
      })
    );
  };

  createStartup$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(CREATE_STARTUP).pipe(
      switchMap(({payload}) => {
        return this.startupService
          .createStartup(payload.startup)
          .pipe(
            map(startup => {
              this.notifierService.notify('success', 'Startup was created successful');
              return createStartupSuccessAction(startup);
            }),
            catchError(error => {
              this.notifierService.notify('error', 'Startup creation failed. Check startup name.');
              return of(fetchStartupsFailedAction(error));
            })
          );
      })
    );
  };

  updateStartup$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(UPDATE_STARTUP).pipe(
      switchMap(({payload}) => {
        return this.startupService
          .updateStartup(payload.startup)
          .pipe(
            map(startup => {
              this.notifierService.notify('success', 'Startup was updated successful');
              return updateStartupSuccessAction(startup);
            }),
            catchError(error => {
              this.notifierService.notify('error', 'Startup update failed. Check startup name.');
              return of(fetchStartupsFailedAction(error));
            })
          );

      })
    );
  };

  deleteStartup$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(DELETE_STARTUP).pipe(
      switchMap(({payload}) => {
        return this.startupService
          .deleteStartup(payload.startupId)
          .pipe(
            map(() => {
              this.notifierService.notify('success', 'Startup was deleted successful');
              return deleteStartupSuccessAction(payload.startupId);
            }),
            catchError(error => {
              this.notifierService.notify('error', 'Startup was not deleted');
              return of(fetchStartupsFailedAction(error));
            })
          );
      })
    );
  };

  selectStartup$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(SELECT_STARTUP).pipe(
      switchMap(({payload}) => {
        return payload.startupId !== null ?
          this.startupService
            .getStartupById(payload.startupId)
            .pipe(
              map(startup => selectStartupSuccess(startup)),
              catchError(error => {
                this.notifierService.notify('error', 'Select startup failed');
                return of(selectStartupFailed(error)); } )
            )
          : of(defaultStartup)
            .pipe(
              map(startup => selectStartupSuccess(startup)),
              catchError(error => {
                this.notifierService.notify('error', 'Select startup failed');
                return of(selectStartupFailed(error)); } )
            );
      })
    );
  };

  searchStartups$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(SEARCH_STARTUPS).pipe(
      switchMap(({payload}) => {
        return this.startupService
          .searchStartup(payload.startupSearchParams)
          .pipe(
            map(startups => searchStartupsSuccessAction(TransformService.transformToMap(startups))),
            catchError(error => {
              this.notifierService.notify('error', 'Search startup failed');
              return of(fetchStartupsFailedAction(error));
            })
          );
      })
    );
  };

  sendResumeToStartup$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(SEND_RESUME_TO_STARTUP).pipe(
      switchMap(({payload}) => {
        return this.startupResumeService
          .sendResumeToStartup(payload.resume, this.ngRedux.getState().startupPageState.startupModel)
          .pipe(
            map(startupResume => {
              this.notifierService.notify('success', 'Resume was sended successful');
              return sendResumeToStartupSuccessAction(startupResume);
            }),
            catchError(error => {
              this.notifierService.notify('error', 'Resume was not sended');
              return of(selectStartupFailed(error));
            })
          );
      })
    );
  };

  cancelResumeToStartup$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(CANCEL_RESUME_TO_STARTUP).pipe(
      switchMap(({payload}) => {
        return this.startupResumeService
          .cancelResume(payload.startupResumeId)
          .pipe(
            map(() => cancelResumeToStartupSuccessAction(payload.startupResumeId)),
            catchError(error => {
              this.notifierService.notify('error', 'Cancel resume failed');
              return of(selectStartupFailed(error));
            })
          );
      })
    );
  };

  makeInvestmentInStartup$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(MAKE_INVESTMENT_IN_STARTUP).pipe(
      switchMap(({payload}) => {
        return this.startupService
          .makeInvestment(payload.investor, payload.startup, payload.sumOfInvestment)
          .pipe(
            map(investment => {
              this.ngRedux.dispatch(updateBalanceAction(payload.investor.id,
                this.ngRedux.getState().currentUserState.currentUser.account.balance - payload.sumOfInvestment));
              this.notifierService.notify('success', 'Investment was made successful');
              return makeInvestmentInStartupSuccessAction(investment);
            }),
            catchError(error => {
              this.notifierService.notify('error', 'Investment was not sended');
              return of(selectStartupFailed(error));
            })
          );
      })
    );
  };
}

