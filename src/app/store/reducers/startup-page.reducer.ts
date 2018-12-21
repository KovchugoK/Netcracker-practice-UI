import {Startup} from '../../model/Startup';
import {Reducer} from 'redux';
import {
  ACCEPT_RESUME_TO_STARTUP, CHANGE_STARTUP_MEMBER_ROLE,
  KICK_MEMBER_FROM_STARTUP,
  MAKE_INVESTMENT_IN_STARTUP_SUCCESS,
  REJECT_RESUME_TO_STARTUP,
  SELECT_STARTUP,
  SELECT_STARTUP_SUCCESS,
  SEND_RESUME_TO_STARTUP_SUCCESS
} from '../actions/startup-state.actions';

import * as uuid from 'uuid';


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
    case SEND_RESUME_TO_STARTUP_SUCCESS: {
      const updatedResumes = [...state.startupModel.startupResumes];
      updatedResumes.push(action.payload.startupResume);
      return {...state, startupModel: {...state.startupModel, startupResumes: updatedResumes}};
    }
    case REJECT_RESUME_TO_STARTUP: {
      const updatedResumes = [...state.startupModel.startupResumes];
      return {
        ...state, startupModel:
          {
            ...state.startupModel, startupResumes:
              updatedResumes.filter(value => value.id !== action.payload.startupResumeId)
          }
      };
    }

    case ACCEPT_RESUME_TO_STARTUP: {
      const updatedResumes = [...state.startupModel.startupResumes];
      for (const startupResume of updatedResumes) {
        if (startupResume.id === action.payload.startupResumeId) {
          const index = updatedResumes.findIndex(value => value === startupResume);
          startupResume.accepted = true;
          updatedResumes.splice(index, 1, startupResume);
        }
      }
      const updatedStartupRoles = [...state.startupModel.startupRoles];
      updatedStartupRoles.push({
        id: uuid.v4,
        startupId: state.startupModel.id,
        accountId: action.payload.accountId,
        roleName: action.payload.roleName
      });
      return {...state, startupModel: {...state.startupModel, startupResumes: updatedResumes, startupRoles: updatedStartupRoles}};
    }

    case KICK_MEMBER_FROM_STARTUP: {
      const updatedResumes = [...state.startupModel.startupResumes];
      const updateStartupRoles = [...state.startupModel.startupRoles];
      return {
        ...state, startupModel:
          {
            ...state.startupModel, startupResumes:
              updatedResumes.filter(value => value.id !== action.payload.startupResumeId),
            startupRoles: updateStartupRoles.filter(value => value.accountId !== action.payload.accountId)
          }
      };
    }

    case MAKE_INVESTMENT_IN_STARTUP_SUCCESS: {
      const updatedStartupInvestments = [...state.startupModel.startupInvestments];
      updatedStartupInvestments.push(action.payload.investment);
      return{...state, startupModel: {...state.startupModel, startupInvestments: updatedStartupInvestments}};
    }

    case CHANGE_STARTUP_MEMBER_ROLE: {
      const updatedStartupRoles = [...state.startupModel.startupRoles];
      for (const startupRole of updatedStartupRoles) {
        if (startupRole.accountId === action.payload.accountId) {
          const index = updatedStartupRoles.findIndex(value => value === startupRole);
          startupRole.roleName = action.payload.roleName;
          updatedStartupRoles.splice(index, 1, startupRole);
        }
      }
      return {...state, startupModel: {...state.startupModel, startupRoles: updatedStartupRoles}};
    }
    default: {
      return state;
    }
  }
};

// case SELECT_STARTUP: {
//   const updatedResumes = [...state.startupModel.startupResumes];
//   updatedResumes.push({});
//   return {...state, startupModel: {...state.startupModel, startupResumes: updatedResumes} ,isSelected: true};
// }
