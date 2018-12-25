import {AppState} from '../index';

export const selectContactsSearchParams = (state: AppState) => state.contactsSearchToolbarState.contactsSearchParams;
