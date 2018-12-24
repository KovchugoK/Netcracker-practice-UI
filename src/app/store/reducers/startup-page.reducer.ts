import {Startup} from '../../model/Startup';
import {Reducer} from 'redux';
import {
  ACCEPT_RESUME_TO_STARTUP, CANCEL_RESUME_TO_STARTUP_SUCCESS, CHANGE_STARTUP_MEMBER_ROLE, DELETE_RESUME_FROM_STARTUP,
  KICK_MEMBER_FROM_STARTUP, LEAVE_STARTUP,
  MAKE_INVESTMENT_IN_STARTUP_SUCCESS,
  REJECT_RESUME_TO_STARTUP,
  SELECT_STARTUP, SELECT_STARTUP_FAILED,
  SELECT_STARTUP_SUCCESS,
  SEND_RESUME_TO_STARTUP_SUCCESS
} from '../actions/startup-state.actions';

import * as uuid from 'uuid';
import {CREATE_STARTUP_SUCCESS, UPDATE_STARTUP_SUCCESS} from '../actions/startups.actions';


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
    case CREATE_STARTUP_SUCCESS:
    case UPDATE_STARTUP_SUCCESS:
    {
      return {...state, startupModel: action.payload.startup};
    }
    case SELECT_STARTUP_SUCCESS: {
      return {...state, startupModel: action.payload.startup, isSelected: false};
    }
    case SELECT_STARTUP: {
      return {...state, isSelected: true};
    }
    case SELECT_STARTUP_FAILED: {
      return {...state, isSelected: false};
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
      let addNewRole = true;
      const updatedStartupRoles = [...state.startupModel.startupRoles];
      for (const startupRole of updatedStartupRoles) {
        if (startupRole.accountId === action.payload.accountId) {
          addNewRole = false;
          break;
        }
      }
      if (addNewRole) {
        updatedStartupRoles.push({
          id: uuid.v4,
          startupId: state.startupModel.id,
          accountId: action.payload.accountId,
          roleName: action.payload.roleName
        });
      }
      return {...state, startupModel: {...state.startupModel, startupResumes: updatedResumes, startupRoles: updatedStartupRoles}};
    }
    case DELETE_RESUME_FROM_STARTUP:
    case KICK_MEMBER_FROM_STARTUP: {
      let updatedResumes = [...state.startupModel.startupResumes];
      const startupRoles = [...state.startupModel.startupRoles];
      let updateStartupRoles;
      if (updatedResumes.filter(value => (value.resume.account.id === action.payload.accountId && value.accepted === true)).length <= 1) {
       updateStartupRoles = startupRoles.filter(value => value.accountId !== action.payload.accountId);
      } else {
        updateStartupRoles = startupRoles;
      }
      updatedResumes = [...state.startupModel.startupResumes];
      return {
        ...state, startupModel:
          {
            ...state.startupModel, startupResumes:
              updatedResumes.filter(value => value.id !== action.payload.startupResumeId),
            startupRoles: updateStartupRoles
          }
      };
    }

    case MAKE_INVESTMENT_IN_STARTUP_SUCCESS: {
      const updatedStartupInvestments = [...state.startupModel.startupInvestments];
      updatedStartupInvestments.push(action.payload.investment);
      return {...state, startupModel: {...state.startupModel, startupInvestments: updatedStartupInvestments}};
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

    case CANCEL_RESUME_TO_STARTUP_SUCCESS: {
      const updatedStartupResumes = [...state.startupModel.startupResumes];

      return {...state, startupModel: {...state.startupModel, startupResumes: updatedStartupResumes.filter(value => value.id !== action.payload.startupResumeId) }};
    }
    case LEAVE_STARTUP: {
      const updatedStartupRoles = [...state.startupModel.startupRoles];
      const updatedStartupResumes = [...state.startupModel.startupResumes];
      return {...state, startupModel: {...state.startupModel,
          startupResumes: updatedStartupResumes.filter(value => value.resume.account.id !== action.payload.accountId),
          startupRoles: updatedStartupRoles.filter(value => value.accountId !== action.payload.accountId)}};
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
