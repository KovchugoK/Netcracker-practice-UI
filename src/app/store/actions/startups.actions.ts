import {Startup} from '../../model/Startup';



export const FETCH_STARTUPS = '[Startups] Fetch startups';
export const FETCH_STARTUPS_SUCCESS = '[Startups] Fetch startups success';
export const FETCH_STARTUPS_FAILED = '[Startups] Fetch startups failed';
export const UPDATE_STARTUP = '[Startups] Update startup';
export const UPDATE_STARTUP_SUCCESS = '[Startups] Update startup success';
export const CREATE_STARTUP = '[Startups] Create startup';
export const CREATE_STARTUP_SUCCESS = '[Startups] Create startup success';
export const DELETE_STARTUP = '[Startup State] Delete startup';
export const DELETE_STARTUP_SUCCESS = '[Startup State] Delete startup success';

export function fetchStartupsAction() {
  return {
    type: FETCH_STARTUPS
  };
}

export function fetchStartupsSuccessAction(startups: Map<string, Startup>) {
  return {
    type: FETCH_STARTUPS_SUCCESS,
    payload: {startups}
  };
}

export function fetchStartupsFailedAction(errorMessage: string) {
  return {
    type: FETCH_STARTUPS_FAILED,
    payload: {errorMessage}
  };
}

export function updateStartupAction(startup: Startup) {
  return {
    type: UPDATE_STARTUP,
    payload: {startup}
  };
}

export function updateStartupSuccessAction(startup: Startup) {
  return {
    type: UPDATE_STARTUP_SUCCESS,
    payload: {startup}
  };
}

export function createStartupAction(startup: Startup) {
  return {
    type: CREATE_STARTUP,
    payload: {startup}
  };
}

export function createStartupSuccessAction(startup: Startup) {
  return {
    type: CREATE_STARTUP_SUCCESS,
    payload: {startup}
  };
}

export function deleteStartupAction(startupId: string) {
  return {
    type: DELETE_STARTUP,
    payload: {startupId}
  };
}

export function deleteStartupSuccessAction(startupId: string) {
  return {
    type: DELETE_STARTUP_SUCCESS,
    payload: {startupId}
  };
}

