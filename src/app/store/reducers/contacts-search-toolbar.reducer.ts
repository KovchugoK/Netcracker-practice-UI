import {Reducer} from 'redux';
import {UPDATE_CONTACTS_SEARCH_PARAMS} from '../actions/contacts-search-toolbar.actions';

export interface ContactsSearchToolbarState {
  readonly contactsSearchParams: string;
}

const INITIAL_STATE = {
  contactsSearchParams: ''
};

export const contactsSearchToolbarReducer: Reducer<ContactsSearchToolbarState> = (state: ContactsSearchToolbarState = INITIAL_STATE, action): ContactsSearchToolbarState => {
  switch (action.type) {
    case UPDATE_CONTACTS_SEARCH_PARAMS:
      return {...state, contactsSearchParams: action.payload.name};
    default:
      return state;
  }
};
