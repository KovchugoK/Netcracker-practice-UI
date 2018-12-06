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
import {SELECT_STARTUP, selectStartupSuccess} from '../actions/startup-state.actions';
import {defaultStartup} from '../../model/Startup';



@Injectable()
export class StartupEpic {
  constructor(private startupService: StartupService) {
  }

  fetchStartups$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(FETCH_STARTUPS).pipe(
      switchMap(({}) => {
        return this.startupService
          .getStartupList()
          .pipe(
            map(startups => fetchStartupsSuccessAction(TransformService.transformToMap(startups))),
            catchError(error => of(fetchStartupsFailedAction(error.message)))
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
            map(startup => createStartupSuccessAction(startup))
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
            map(startup => updateStartupSuccessAction(startup))
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
            map(() => deleteStartupSuccessAction(payload.startupId))
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
              catchError(error => of(fetchStartupsFailedAction(error.message)))
            )
          : of(defaultStartup)
            .pipe(
              map(startup => selectStartupSuccess(startup)),
              catchError(error => of(fetchStartupsFailedAction(error.message)))
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
            map(startups => searchStartupsSuccessAction(TransformService.transformToMap(startups))  ),
            catchError(error => of(fetchStartupsFailedAction(error.message)))
          );
      })
    );
  };

}

