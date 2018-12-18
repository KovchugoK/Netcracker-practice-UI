import {Startup} from '../../model/Startup';
import {Reducer} from 'redux';
import {SELECT_STARTUP, SELECT_STARTUP_SUCCESS} from '../actions/startup-state.actions';
import {Resume} from "../../model/Resume";
import {SELECT_RESUME, SELECT_RESUME_SUCCESS} from "../actions/resume-state.actions";
import {SELECT_ACCOUNT} from "../actions/account-state.actions";

export interface ResumePageState {
  readonly resumeModel: Resume;
  readonly isSelected: boolean;
  readonly isAddesToFav: boolean;
}

const INITIAL_STATE = {
  resumeModel: null,
  isSelected: true,
  isAddesToFav: true
};

export const resumePageReducer: Reducer<ResumePageState> = (state: ResumePageState = INITIAL_STATE, action) => {
  switch (action.type) {

    case SELECT_RESUME_SUCCESS: {
      return {...state, resumeModel: action.payload.resume, isSelected: false};
    }
    case SELECT_RESUME: {
      return {...state, isSelected: true};
    }
    default: {
      return state;
    }
  }
};
