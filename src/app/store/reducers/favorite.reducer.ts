import {Reducer} from 'redux';
import {
  CREATE_RESUME, CREATE_RESUME_SUCCESS, DELETE_RESUME, DELETE_RESUME_SUCCESS, FETCH_RESUMES, FETCH_RESUMES_INVESTORS,
  FETCH_RESUMES_INVESTORS_SUCCESS,
  FETCH_RESUMES_SPECIALISTS,
  FETCH_RESUMES_SPECIALISTS_SUCCESS,
  FETCH_RESUMES_SUCCESS, SEARCH_RESUMES, SEARCH_RESUMES_SUCCESS,
  UPDATE_RESUME, UPDATE_RESUME_SUCCESS
} from '../actions/resume.actions';
import {Favorite} from "../../model/Favorite";
import {
  DELETE_FAVORITE, DELETE_FAVORITE_SUCCESS, FETCH_FAVORITES,
  FETCH_FAVORITES_SUCCESS, UPDATE_FAVORITES
} from "../actions/favorite.actions";

export interface FavoritesState {
  readonly favorites: Map<string, Favorite>;
  readonly isLoading: boolean;
}

const INITIAL_STATE = {
  favorites: new Map<string, Favorite>(),
  isLoading: false
};

export const favoriteReducer: Reducer<FavoritesState> = (state: FavoritesState = INITIAL_STATE, action): FavoritesState => {
  switch (action.type) {
    case FETCH_FAVORITES: {
      return {...state, isLoading: true};
    }
    case FETCH_FAVORITES_SUCCESS: {
      return {...state, ...action.payload, isLoading: false};
    }
    case DELETE_FAVORITE: {
      return {...state, isLoading: true};
    }
    case DELETE_FAVORITE_SUCCESS: {
      const {favoriteId} = action.payload;
      const updatedFavorites = new Map(state.favorites);
      updatedFavorites.delete(favoriteId);
      return {...state, favorites: updatedFavorites, isLoading: false};
    }
    case UPDATE_FAVORITES: {
      return {...state, favorites: action.payload.favorites};
    }
    default: {
      return state;
    }
  }
};
