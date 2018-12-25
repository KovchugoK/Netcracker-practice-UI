import {Account} from '../../model/Account';
import {Reducer} from 'redux';
import {SELECT_ACCOUNT, SELECT_ACCOUNT_SUCCESS} from '../actions/account-state.actions';
import {
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT,
  UPDATE_ACCOUNT_SUCCESS
} from "../actions/accounts.actions";

export interface AccountPageState {
  readonly accountModel: Account;
  readonly isSelected: boolean;
  readonly isLoading: boolean;
}

const INITIAL_STATE = {
  accountModel: null,
  isSelected: true,
  isLoading: false,
};

export const accountPageReducer: Reducer<AccountPageState> = (state: AccountPageState = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_ACCOUNT:{
      return {...state, isLoading: true}
    }
    case UPDATE_ACCOUNT_SUCCESS: {
      return {...state, accountModel: action.payload.account, isLoading: false};
    }
    case SELECT_ACCOUNT: {
      return {...state, isLoading: true};
    }
    case SELECT_ACCOUNT_SUCCESS: {
      return {...state, accountModel: action.payload.account, isLoading: false};
    }
    case DELETE_ACCOUNT: {
      return {...state, isLoading: true};
    }
    case DELETE_ACCOUNT_SUCCESS: {
      return {...state, isLoading: false};
    }
    default: {
      return state;
    }
  }
};
