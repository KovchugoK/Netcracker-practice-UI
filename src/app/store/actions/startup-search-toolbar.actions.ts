import {StartupSearchParams} from '../reducers/startup-search-toolbar.reducer';

export const UPDATE_STARTUP_SEARCH_TOOLBAR = '[STARTUP SEARCH TOOLBAR] Update startup search toolbar state';

export function updateStartupSearchToolbarAction(startupSearchParams: StartupSearchParams) {
  return {
    type: UPDATE_STARTUP_SEARCH_TOOLBAR,
    payload: {startupSearchParams}
  };
}
