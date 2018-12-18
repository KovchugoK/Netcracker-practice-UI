import {AppState} from "../index";

export const isLoading = (state: AppState) => state.favoritesState.isLoading;

export const selectFavorites = (state: AppState) => Array.from(state.favoritesState.favorites.values());

export const selectFavoriteById = (state: AppState, favoriteId: string) => {
  return state.favoritesState.favorites.get(favoriteId);
};
