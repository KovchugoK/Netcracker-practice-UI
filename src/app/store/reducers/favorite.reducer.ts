import {Reducer} from 'redux';
import {Favorite} from "../../model/Favorite";
import {
  DELETE_FAVORITE, DELETE_FAVORITE_SUCCESS, FETCH_FAVORITES,
  FETCH_FAVORITES_SUCCESS
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
    default: {
      return state;
    }
  }
};
