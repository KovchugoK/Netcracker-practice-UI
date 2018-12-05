import {Startup} from '../../model/Startup';
import {Reducer} from 'redux';
import {
  FETCH_STARTUPS_SUCCESS,
  FETCH_STARTUPS,
  CREATE_STARTUP,
  UPDATE_STARTUP_SUCCESS,
  CREATE_STARTUP_SUCCESS,
  UPDATE_STARTUP,
  DELETE_STARTUP,
  DELETE_STARTUP_SUCCESS,
  SEARCH_STARTUPS,
  SEARCH_STARTUPS_SUCCESS
} from '../actions/startups.actions';

export interface StartupsState {
  readonly startups: Map<string, Startup>;
  readonly isLoading: boolean;
}

const INITIAL_STATE = {
  startups: new Map<string, Startup>(),
  isLoading: false
};

export const startupsReducer: Reducer<StartupsState> = (state: StartupsState = INITIAL_STATE, action): StartupsState => {
  switch (action.type) {
    case SEARCH_STARTUPS:
    case FETCH_STARTUPS: {
      return {...state, isLoading: true};
    }
    case SEARCH_STARTUPS_SUCCESS:
    case FETCH_STARTUPS_SUCCESS: {
      return {...state, ...action.payload, isLoading: false};
    }

    case CREATE_STARTUP:
    case UPDATE_STARTUP:
    case DELETE_STARTUP: {
      return {...state, isLoading: true};
    }
    case CREATE_STARTUP_SUCCESS:
    case UPDATE_STARTUP_SUCCESS: {
      const {startup} = action.payload;
      const updatedStartups = new Map(state.startups).set(startup.id, startup);
      return {...state, startups: updatedStartups, isLoading: false};
    }
    case DELETE_STARTUP_SUCCESS: {
      const {startupId} = action.payload;
      const updatedStartups = new Map(state.startups);
      updatedStartups.delete(startupId);
      return {...state, startups: updatedStartups, isLoading: false};
    }
    default: {
      return state;
    }
  }
};
