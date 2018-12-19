import {AppState} from '../index';
import {defaultAccount} from '../../model/Account';

 export const isLoading = (state: AppState) => state.accountPageState.isLoading;

 export const selectAccountFromState = (state: AppState) => {
   return state.accountPageState.accountModel;
 };

 export const selectAccountForEdit = (state: AppState) => {
   const account = state.accountPageState.accountModel;
   return account ? account : defaultAccount;
 };

 export const isSelected = (state: AppState) => state.accountPageState.isSelected;
