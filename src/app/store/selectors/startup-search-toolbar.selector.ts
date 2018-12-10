import {AppState} from '../index';

export const selectStartupSearchParams = (state: AppState) => state.startupSearchToolbarState.startupSearchParams;
export const selectMyStartupSearchParams = (state: AppState) => state.startupSearchToolbarState.myStartupSearchParams;
