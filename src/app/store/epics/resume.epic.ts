import {Injectable} from '@angular/core';
import {
  FETCH_STARTUPS, fetchStartupsSuccessAction, fetchStartupsFailedAction, CREATE_STARTUP,
  createStartupSuccessAction, updateStartupSuccessAction, DELETE_STARTUP, deleteStartupSuccessAction, UPDATE_STARTUP
} from '../actions/startups.actions';
import {catchError, switchMap, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {ActionsObservable} from 'redux-observable';
import {AnyAction} from 'redux';
import {TransformService} from '../../utils/transform.service';
import {SELECT_STARTUP, selectStartupSuccess} from '../actions/startup-state.actions';
import {defaultStartup} from '../../model/Startup';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../index';
import {ResumeService} from "../../services/resume.service";
import {
  CREATE_RESUME, createResumeSuccessAction, DELETE_RESUME, deleteResumeSuccessAction, FETCH_RESUMES,
  fetchResumesFailedAction,
  fetchResumesSuccessAction
} from "../actions/resume.actions";
import {SELECT_RESUME, selectResumeSuccess} from "../actions/resume-state.actions";
import {defaultResume} from "../../model/Resume";


@Injectable()
export class ResumeEpic {
  constructor(private resumeService: ResumeService, private ngRedux: NgRedux<AppState>) {
  }

  fetchResumes$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(FETCH_RESUMES).pipe(
      switchMap(({}) => {
        return this.resumeService
          .gerResumeList()
          .pipe(
            map(resumes => fetchResumesSuccessAction(TransformService.transformToMap(resumes))),
            catchError(error => of(fetchResumesFailedAction(error.message)))
          );
      })
    );
  };

   createResume$ = (action$: ActionsObservable<AnyAction>) => {
     return action$.ofType(CREATE_RESUME).pipe(
       switchMap(({payload}) => {
         return this.resumeService.createResume(payload.resume)
           .pipe(
             map(resume => createResumeSuccessAction(resume))
           );
       })
     );
   };

   /*updateStartup$ = (action$: ActionsObservable<AnyAction>) => {
     return action$.ofType(UPDATE_STARTUP).pipe(
       switchMap(({payload}) => {
         return this.startupService
           .updateStartup(payload.startup)
           .pipe(
             map(startup => updateStartupSuccessAction(startup))
           );
       })
     );
   };*/

   deleteResume$ = (action$: ActionsObservable<AnyAction>) => {
     return action$.ofType(DELETE_RESUME).pipe(
       switchMap(({payload}) => {
         return this.resumeService.deleteResume(payload.resumeId)
           .pipe(
             map(() => deleteResumeSuccessAction(payload.resumeId))
           );
       })
     );
   };

  selectResume$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(SELECT_RESUME).pipe(
      switchMap(({payload}) => {
        return payload.resumeId !== null ?
          this.resumeService
            .getResumeById(payload.resumeId)
            .pipe(
              map(resume => selectResumeSuccess(resume)),
              catchError(error => of(fetchResumesFailedAction(error.message)))
            )
          : of(defaultResume)
            .pipe(
              map(resume => selectResumeSuccess(resume)),
              catchError(error => of(fetchResumesFailedAction(error.message)))
            );
      })
    );
  };

}

