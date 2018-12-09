import {Account} from '../../model/Account';
import {Reducer} from 'redux';
import {SELECT_ACCOUNT, SELECT_ACCOUNT_SUCCESS} from '../actions/account-state.actions';

export interface AccountPageState {
  readonly accountModel: Account;
  readonly isSelected: boolean;
}

const INITIAL_STATE = {
  accountModel: null,
  isSelected: true
};

export const accountPageReducer: Reducer<AccountPageState> = (state: AccountPageState = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_ACCOUNT_SUCCESS: {
      return {...state, accountModel: action.payload.account, isSelected: false};
    }
    case SELECT_ACCOUNT: {
      return {...state, isSelected: true};
    }
    default: {
      return state;
    }
  }
};
