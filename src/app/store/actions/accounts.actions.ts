import {Account} from '../../model/Account';
export const UPDATE_ACCOUNT = '[Accounts] Update account';
export const UPDATE_ACCOUNT_SUCCESS = '[Accounts] Update account success';
export const DELETE_ACCOUNT = '[Account State] Delete account';
export const DELETE_ACCOUNT_SUCCESS = '[Account State] Delete account success';
export const FETCH_ACCOUNT_FAILED = '[Startups] Fetch account failed';

export function fetchAccountFailedAction(errorMessage: string) {
  return {
    type: FETCH_ACCOUNT_FAILED,
    payload: {errorMessage}
  };
}

export function updateAccountAction(account: Account) {
  return {
    type: UPDATE_ACCOUNT,
    payload: {account}
  };
}

export function updateAccountSuccessAction(account: Account) {
  return {
    type: UPDATE_ACCOUNT_SUCCESS,
    payload: {account}
  };
}

export function deleteAccountAction(accountId: string) {
  return {
    type: DELETE_ACCOUNT,
    payload: {accountId}
  };
}

export function deleteAccountSuccessAction(accountId: string) {
  return {
    type: DELETE_ACCOUNT_SUCCESS,
    payload: {accountId}
  };
}
