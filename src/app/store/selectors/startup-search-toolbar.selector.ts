import {AppState} from '../index';

export const selectStartupSearchParams = (state: AppState) => state.startupSearchToolbarState.startupSearchParams;
