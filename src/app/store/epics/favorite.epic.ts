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
import {
  DELETE_FAVORITE, deleteFavoriteSuccessAction, FETCH_FAVORITES, fetchFavoritesFailedAction,
  fetchFavoritesSuccessAction
} from "../actions/favorite.actions";
import {FavoriteService} from "../../services/favorite.service";


@Injectable()
export class FavoriteEpic {
  constructor(private favoriteService: FavoriteService,
              private ngRedux: NgRedux<AppState>) {
  }

  fetchFavorites$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(FETCH_FAVORITES).pipe(
      switchMap(({payload}) => {
        return this.favoriteService.getFavorites(payload.account)
          .pipe(
            map(favorite => fetchFavoritesSuccessAction(TransformService.transformToMap(favorite))),
            catchError(error => of(fetchFavoritesFailedAction(error.message)))
          );
      })
    );
  };


  deleteFavorite$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(DELETE_FAVORITE).pipe(
      switchMap(({payload}) => {
        return this.favoriteService.deleteFavorite(payload.favoriteId)
          .pipe(
            map(() => deleteFavoriteSuccessAction(payload.favoriteId))
          );
      })
    );
  };

}

