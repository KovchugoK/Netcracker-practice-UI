export const UPDATE_CONTACTS_SEARCH_PARAMS = 'UPDATE_CONTACTS_SEARCH_PARAMS';

export function updateContactsSearchParamsAction(name: string) {
  return {
    type: UPDATE_CONTACTS_SEARCH_PARAMS,
    payload: {name}
  };
}
