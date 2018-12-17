import {Account} from '../../model/Account';
export const SELECT_ACCOUNT = '[Account State] Select account';
export const SELECT_ACCOUNT_SUCCESS = '[Account State] Select account success';

export function selectAccount(accountId: string) {
  return {
    type: SELECT_ACCOUNT,
    payload: {accountId}
  };
}

export function selectAccountSuccess(account: Account) {
  return {
    type: SELECT_ACCOUNT_SUCCESS,
    payload: {account}
  };
}

