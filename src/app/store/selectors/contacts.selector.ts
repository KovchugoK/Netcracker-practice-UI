import {AppState} from '../index';

export const selectContacts = (state: AppState) => Array.from(state.contactsState.contacts.values());

export const isLoading = (state: AppState) => state.contactsState.isLoading;
