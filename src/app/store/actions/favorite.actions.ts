import {Favorite} from "../../model/Favorite";
import {Account} from "../../model/Account"

export const FETCH_FAVORITES = '[Favorites] Fetch resumes favorites';
export const FETCH_FAVORITES_SUCCESS = '[Favorites] Fetch resumes favorites success';
export const FETCH_FAVORITES_FAILED = '[Favorites] Fetch resumes favorites failed';

export const DELETE_FAVORITE = '[Favorites State] Delete favorite';
export const DELETE_FAVORITE_SUCCESS = '[Favorites State] Delete favorite success';

export const UPDATE_FAVORITES = '[Favorite State] Update favorite';

export function fetchFavoritesAction(account: Account) {
  return {
    type: FETCH_FAVORITES,
    payload: {account}
  };
}

export function fetchFavoritesSuccessAction(favorites: Map<string, Favorite>) {
  return {
    type: FETCH_FAVORITES_SUCCESS,
    payload: {favorites}
  };
}

export function fetchFavoritesFailedAction(errorMessage: string) {
  return {
    type: FETCH_FAVORITES_FAILED,
    payload: {errorMessage}
  };
}

export function deleteFavoriteAction(favoriteId: string) {
  return {
    type: DELETE_FAVORITE,
    payload: {favoriteId}
  };
}

export function deleteFavoriteSuccessAction(favoriteId: string) {
  return {
    type: DELETE_FAVORITE_SUCCESS,
    payload: {favoriteId}
  };
}

export function updateFavoritesAction(favorites: Favorite) {
  return {
    type: UPDATE_FAVORITES,
    payload: {favorites}
  };
}

