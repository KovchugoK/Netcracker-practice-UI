import {Contact} from '../../model/Contact';

export const FETCH_CONTACTS_SUCCESS = 'FETCH_CONTACTS_SUCCESS';
export const FETCH_CONTACTS_FAILED = 'FETCH_CONTACTS_FAILED';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const ADD_CONTACT = 'ADD_CONTACT';

export function fetchContactsSuccessAction(contacts: Map<string, Contact>) {
  return {
    type: FETCH_CONTACTS_SUCCESS,
    payload: {contacts}
  };
}

export function fetchContactsFailedAction(message: string) {
  return {
    type: FETCH_CONTACTS_FAILED,
    error: true,
    payload: {message}
  };
}

export function deleteContact(userId: string) {
  return {
    type: DELETE_CONTACT,
    payload: {userId}
  };
}

export function addContact(userId: string) {
  return {
    type: ADD_CONTACT,
    payload: {userId}
  };
}
