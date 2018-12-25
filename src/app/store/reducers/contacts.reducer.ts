import {Contact} from '../../model/Contact';
import {Reducer} from 'redux';
import {
  ADD_CONTACT,
  ADD_CONTACT_FAILED,
  ADD_CONTACT_SUCCESS,
  DELETE_CONTACT,
  DELETE_CONTACT_FAILED,
  DELETE_CONTACT_SUCCESS,
  FETCH_CONTACTS,
  FETCH_CONTACTS_FAILED,
  FETCH_CONTACTS_SUCCESS,
  SEARCH_CONTACTS,
  SEARCH_CONTACTS_FAILED,
  SEARCH_CONTACTS_SUCCESS
} from '../actions/contacts.actions';

export interface ContactsState {
  readonly contacts: Map<string, Contact>;
  readonly isLoading: boolean;
}

const INITIAL_STATE = {
  contacts: new Map<string, Contact>(),
  isLoading: false
};

export const contactsReducer: Reducer<ContactsState> = (state: ContactsState = INITIAL_STATE, action): ContactsState => {
  switch (action.type) {
    case SEARCH_CONTACTS:
    case FETCH_CONTACTS:
      return {...state, isLoading: true};
    case SEARCH_CONTACTS_SUCCESS:
    case FETCH_CONTACTS_SUCCESS:
      return {...state, ...action.payload, isLoading: false};
    case SEARCH_CONTACTS_FAILED:
    case FETCH_CONTACTS_FAILED:
      return {...state, isLoading: false};
    case DELETE_CONTACT:
      return {...state, isLoading: true};
    case DELETE_CONTACT_SUCCESS: {
      const updatedContacts = new Map(state.contacts);
      updatedContacts.delete(action.payload.otherId);
      return {...state, contacts: updatedContacts, isLoading: false};
    }
    case DELETE_CONTACT_FAILED:
      return {...state, isLoading: false};
    case ADD_CONTACT:
      return {...state, isLoading: true};
    case ADD_CONTACT_SUCCESS: {
      const {contact} = action.payload;
      const updatedContacts = new Map(state.contacts);
      updatedContacts.set(contact.id, contact);
      return {...state, contacts: updatedContacts, isLoading: false};
    }
    case ADD_CONTACT_FAILED:
      return {...state, isLoading: false};
    default:
      return state;
  }
};
