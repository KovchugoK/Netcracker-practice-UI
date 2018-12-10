import {Contact} from '../../model/Contact';
import {Reducer} from 'redux';
import {ADD_CONTACT, DELETE_CONTACT, DELETE_CONTACT_SUCCESS, FETCH_CONTACTS, FETCH_CONTACTS_SUCCESS} from '../actions/contacts.actions';

export interface ContactsState {
  readonly contacts: Map<string, Contact>;
}

const INITIAL_STATE = {
  contacts: new Map<string, Contact>()
};

export const contactsReducer: Reducer<ContactsState> = (state: ContactsState = INITIAL_STATE, action): ContactsState => {
  switch (action.type) {
    case FETCH_CONTACTS:
      return {...state, ...action.payload};
    case FETCH_CONTACTS_SUCCESS:
      return {...state, ...action.payload};
    case DELETE_CONTACT:
      return {...state, ...action.payload};
    case DELETE_CONTACT_SUCCESS: {
      const updatedContacts = new Map(state.contacts);
      updatedContacts.delete(action.payload.otherId);
      return {...state, contacts: updatedContacts};
    }
    case ADD_CONTACT:
      const {contact} = action.payload;
      const updatedContacts = new Map(state.contacts);
      updatedContacts.set(contact.id, contact);
      return {...state, contacts: updatedContacts};
    default:
      return state;
  }
};
