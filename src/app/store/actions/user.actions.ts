import {User} from '../../model/User';

export const LOAD_CURRENT_USER = '[Current user] Load current user';
export const LOAD_CURRENT_USER_SUCCESS = '[Current user] Load current user success';
export const  CLEAR_CURRENT_USER_SUCCESS = '[Current user] Clear current user success';
export function loadCurrentUserAction() {
  return {
    type: LOAD_CURRENT_USER
  };
}

export function loadCurrentUserSuccessAction(currentUser: User) {
  return {
    type: LOAD_CURRENT_USER_SUCCESS,
    payload: {currentUser}
  };
}


export function clearCurrentUserSuccessAction() {
  return {
    type: CLEAR_CURRENT_USER_SUCCESS
  };
}
