import {Reducer} from 'redux';
import {SearchObject} from "../../model/SearchObject";
import {UPDATE_SPESIALISTS_SEARCH_TOOLBAR} from "../actions/specialists-search-toolbar.actions";


export interface SpecialistsSearchToolbarState {
  readonly searchObj: SearchObject;
}

const INITIAL_STATE = {
  searchObj: {
    roles: [],
    skills: [],
    searchString: ''
  }
};


export const specialistsSearchToolbarReducer: Reducer<SpecialistsSearchToolbarState> = (state: SpecialistsSearchToolbarState = INITIAL_STATE, action): SpecialistsSearchToolbarState => {
  switch (action.type) {
    case UPDATE_SPESIALISTS_SEARCH_TOOLBAR: {
      return {...state, searchObj: action.payload.searchObj};
    }
    default: {
      return state;
    }
  }
};
