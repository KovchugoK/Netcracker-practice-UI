import {Injectable} from '@angular/core';

import {catchError, switchMap, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {ActionsObservable} from 'redux-observable';
import {AnyAction} from 'redux';
import {TransformService} from '../../utils/transform.service';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../index';
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

