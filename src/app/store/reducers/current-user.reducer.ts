import { Reducer } from 'redux';
import {
  CLEAR_USER_ERROR_MESSAGE,
  LOGIN_USER,
  LOGIN_USER_FAILED,
  UPDATE_BALANCE_SUCCESS,
  UPDATE_CURRENT_USER
} from '../actions/current-user.actions';
import {User} from '../../model/User';


export interface CurrentUserState {
  readonly currentUser: User;
  readonly isLoading: boolean;
  readonly errorMessage: string;
}

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  errorMessage: null
};


export const currentUserReducer: Reducer<CurrentUserState> = (state: CurrentUserState = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_USER: {
      return {...state, currentUser: action.payload.user, isLoading: false, errorMessage: null};
    }
    case LOGIN_USER: {
      return {...state, isLoading: true, errorMessage: null};
    }
    case LOGIN_USER_FAILED: {
      return {...state, isLoading: false, errorMessage: action.payload.errorMessage};
    }
    case CLEAR_USER_ERROR_MESSAGE: {
      return {...state, errorMessage: null};
    }
    case UPDATE_BALANCE_SUCCESS: {
      return {
        ...state, currentUser: {
          ...state.currentUser,
          account: {...state.currentUser.account, balance: action.payload.balance}
        }
      };
    }
    default: {
      return state;
    }
  }

};
