import {Contact} from '../../model/Contact';

export const FETCH_CONTACTS = 'FETCH_CONTACTS';
export const FETCH_CONTACTS_SUCCESS = 'FETCH_CONTACTS_SUCCESS';
export const FETCH_CONTACTS_FAILED = 'FETCH_CONTACTS_FAILED';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const DELETE_CONTACT_SUCCESS = 'DELETE_CONTACT_SUCCESS';
export const DELETE_CONTACT_FAILED = 'DELETE_CONTACT_FAILED';
export const ADD_CONTACT = 'ADD_CONTACT';

export function fetchContactsAction(userId: string) {
  return {
    type: FETCH_CONTACTS,
    payload: {userId}
  };
}

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

export function deleteContactAction(yourId: string, otherId: string) {
  return {
    type: DELETE_CONTACT,
    payload: {yourId, otherId}
  };
}

export function deleteContactSuccessAction(yourId: string, otherId: string) {
  return {
    type: DELETE_CONTACT_SUCCESS,
    payload: {yourId, otherId}
  };
}

export function deleteContactFailedAction(message: string) {
  return {
    type: DELETE_CONTACT_FAILED,
    error: true,
    payload: {message}
  };
}

export function addContactAction(userId: string) {
  return {
    type: ADD_CONTACT,
    payload: {userId}
  };
}
