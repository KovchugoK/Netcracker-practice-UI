import {Startup} from '../../model/Startup';

export const SELECT_STARTUP = '[Startup State] Select startup';
export const SELECT_STARTUP_SUCCESS = '[Startup State] Select startup success';

export function selectStartup(startupId: string) {
  return {
    type: SELECT_STARTUP,
    payload: {startupId}
  };
}

export function selectStartupSuccess(startup: Startup) {
  return {
    type: SELECT_STARTUP_SUCCESS,
    payload: {startup}
  };
}


