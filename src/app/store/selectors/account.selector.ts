import {AppState} from '../index';
import {defaultAccount} from '../../model/Account';

// // Accounts state
// export const selectAccounts = (state: AppState) => Array.from(state.accountsState.accounts.values());
//
// export const isLoading = (state: AppState) => state.accountsState.isLoading;
//
// export const selectAccountById = (state: AppState, accountId: string) => {
//   const account = state.accountsState.accounts.get(accountId);
//   return account ? account : defaultAccount;
// };
// // Account-page state
// export const selectAccountFromState = (state: AppState) => {
//   return state.accountPageState.accountModel;
// };
//
// export const selectAccountForEdit = (state: AppState) => {
//   const account = state.accountPageState.accountModel;
//   return account ? account : defaultAccount;
// };
//
// export const isSelected = (state: AppState) => state.accountPageState.isSelected;
