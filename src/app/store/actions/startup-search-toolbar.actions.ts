import {StartupSearchParams} from '../reducers/startup-search-toolbar.reducer';

export const UPDATE_STARTUP_SEARCH_TOOLBAR = '[STARTUP SEARCH TOOLBAR] Update startup search toolbar state';
export const UPDATE_MY_STARTUP_SEARCH_TOOLBAR = '[STARTUP SEARCH TOOLBAR] Update my startup search toolbar state';


export function updateStartupSearchToolbarAction(startupSearchParams: StartupSearchParams) {
  return {
    type: UPDATE_STARTUP_SEARCH_TOOLBAR,
    payload: {startupSearchParams}
  };
}
export function updateMyStartupSearchToolbarAction(startupSearchParams: StartupSearchParams) {
  return {
    type: UPDATE_MY_STARTUP_SEARCH_TOOLBAR,
    payload: {startupSearchParams}
  };
}
