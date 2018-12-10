import {Reducer} from 'redux';
import {SortStartupType} from '../../model/SortStartupType';
import {UPDATE_MY_STARTUP_SEARCH_TOOLBAR, UPDATE_STARTUP_SEARCH_TOOLBAR} from '../actions/startup-search-toolbar.actions';

export interface StartupSearchParams {
  readonly startupNameContains: string;
  readonly creatorNameContains: string;
  readonly sortType: SortStartupType;
  readonly accountID: string;
}

export interface StartupSearchToolbarState {
  readonly startupSearchParams: StartupSearchParams;
  readonly myStartupSearchParams: StartupSearchParams;
}

const INITIAL_STATE = {
  startupSearchParams: {
    startupNameContains: '',
    creatorNameContains: '',
    sortType: {value: {sortBy: 'startupName', sortDirection: 'ASC'}, viewValue: 'Startup name (A-Z)'},
    accountID: ''
  },

  myStartupSearchParams: {
    startupNameContains: '',
    creatorNameContains: '',
    sortType: {value: {sortBy: 'startupName', sortDirection: 'ASC'}, viewValue: 'Startup name (A-Z)'},
    accountID: ''
  }
};


export const startupSearchToolbarReducer: Reducer<StartupSearchToolbarState> = (state: StartupSearchToolbarState = INITIAL_STATE, action): StartupSearchToolbarState => {
  switch (action.type) {
    case UPDATE_STARTUP_SEARCH_TOOLBAR: {
      return {...state, startupSearchParams: action.payload.startupSearchParams};
    }
    case UPDATE_MY_STARTUP_SEARCH_TOOLBAR: {
      return {...state, myStartupSearchParams: action.payload.startupSearchParams};
    }
    default: {
      return state;
    }
  }
};
