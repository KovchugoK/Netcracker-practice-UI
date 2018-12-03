import {Startup} from '../../model/Startup';
import {Reducer} from 'redux';
import {SELECT_STARTUP, SELECT_STARTUP_SUCCESS} from '../actions/startup-state.actions';

export interface StartupPageState {
  readonly startupModel: Startup;
  readonly isSelected: boolean;
}

const INITIAL_STATE = {
  startupModel: null,
  isSelected: true
};

export const startupPageReducer: Reducer<StartupPageState> = (state: StartupPageState = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_STARTUP_SUCCESS: {
      return {...state, startupModel: action.payload.startup, isSelected: false};
    }
    case SELECT_STARTUP: {
      return {...state, isSelected: true};
    }
    default: {
      return state;
    }
  }
};
