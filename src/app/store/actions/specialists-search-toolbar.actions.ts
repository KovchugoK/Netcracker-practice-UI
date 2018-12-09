import {SearchObject} from "../../model/SearchObject";

export const UPDATE_SPESIALISTS_SEARCH_TOOLBAR = '[SPECIALISTS SEARCH TOOLBAR] Update specialists search toolbar state';

export function updateSpecialistsSearchToolbarAction(searchObj: SearchObject) {
  return {
    type: UPDATE_SPESIALISTS_SEARCH_TOOLBAR,
    payload: {searchObj}
  };
}
