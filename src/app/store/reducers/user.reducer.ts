import {Reducer} from 'redux';
import {User} from '../../model/User';
import {CLEAR_CURRENT_USER_SUCCESS, LOAD_CURRENT_USER_SUCCESS} from '../actions/user.actions';

export interface UserState {
  readonly currentUser: User;
}

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem('currentUser'))
};

export const userReducer: Reducer<UserState> = (state: UserState = INITIAL_STATE, action): UserState => {
  switch (action.type) {
    case LOAD_CURRENT_USER_SUCCESS: {
      return {...state, currentUser: action.payload.currentUser};
    }
    case CLEAR_CURRENT_USER_SUCCESS: {
      return {...state, currentUser: null};
    }
    default: {
      return state;
    }
  }
};
