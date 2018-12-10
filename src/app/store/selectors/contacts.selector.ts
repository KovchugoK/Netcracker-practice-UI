import {AppState} from '../index';

export const selectContacts = (state: AppState) => Array.from(state.contactsState.contacts.values());
