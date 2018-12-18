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
  FETCH_RESUMES_INVESTORS,
  FETCH_RESUMES_SPECIALISTS,
  fetchResumesFailedAction, fetchResumesInvestorsFaildAction, fetchResumesInvestorsSuccessAction,
  fetchResumesSpecialistsFaildAction,
  fetchResumesSpecialistsSuccessAction,
  fetchResumesSuccessAction, SEARCH_RESUMES, searchResumesSuccessAction, UPDATE_RESUME, updateResumeSuccessAction
} from "../actions/resume.actions";
import {SELECT_RESUME, selectResumeSuccess} from "../actions/resume-state.actions";
import {defaultResume} from "../../model/Resume";
import {SpecialistService} from "../../services/specialist.service";
import {selectResumeById} from "../selectors/resume.selector";


@Injectable()
export class ResumeEpic {
  constructor(private resumeService: ResumeService,
              private ngRedux: NgRedux<AppState>,
              private specialistService: SpecialistService,) {
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

  updateResume$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(UPDATE_RESUME).pipe(
      switchMap(({payload}) => {
        return this.resumeService.updateResume(payload.resume)
          .pipe(
            map(resume => updateResumeSuccessAction(resume))
          );
      })
    );
  };

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
        if (payload.resumeId !== null) {
          const resume = selectResumeById(this.ngRedux.getState(), payload.resumeId);
          if (resume) {
            return of(selectResumeSuccess(resume));
          } else {
            return this.resumeService
              .getResumeById(payload.resumeId)
              .pipe(
                map(resume => selectResumeSuccess(resume)),
                catchError(error => of(fetchResumesFailedAction(error.message)))
              )
          }} else {
             return of(selectResumeSuccess(defaultResume));
        }

      })
    );
  };

  fetchResumesSpecialists$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(FETCH_RESUMES_SPECIALISTS).pipe(
      switchMap(({payload}) => {
        return payload.searchObj !== null ?
          this.specialistService
            .getSpecialistList(payload.searchObj)
            .pipe(
              map(resumes => fetchResumesSpecialistsSuccessAction(TransformService.transformToMap(resumes))),
              catchError(error => of(fetchResumesSpecialistsFaildAction(error.message)))
            ) : this.specialistService
            .getSpecialistList(null)
            .pipe(
              map(resumes => fetchResumesSpecialistsSuccessAction(TransformService.transformToMap(resumes))),
              catchError(error => of(fetchResumesFailedAction(error.message)))
            );

      })
    );
  };

  fetchResumesInvestors$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(FETCH_RESUMES_INVESTORS).pipe(
      switchMap(({}) => {
        return this.specialistService.getInvestorList()
          .pipe(
            map(resumes => fetchResumesInvestorsSuccessAction(TransformService.transformToMap(resumes))),
            catchError(error => of(fetchResumesInvestorsFaildAction(error.message)))
          );
      })
    );
  };

  searchResumes$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(SEARCH_RESUMES).pipe(
      switchMap(({payload}) => {
        return this.specialistService
          .getSpecialistList(payload.searchObj)
          .pipe(
            map(resumes => searchResumesSuccessAction(TransformService.transformToMap(resumes))),
            catchError(error => of(fetchResumesFailedAction(error.message)))
          );
      })
    );
  };

}

