import {AppState} from '../index';
import {defaultStartup} from '../../model/Startup';
import {selectCurrentUser} from './current-user.selector';

// Startups state
export const selectStartups = (state: AppState) => Array.from(state.startupsState.startups.values());

export const selectMyStartupsAsLeader = (state: AppState) => {
  const currentUserId = selectCurrentUser(state).account.id;
  return selectStartups(state).filter(startup => startup.account.id === currentUserId);
};

export const selectMyStartupsAsMember = (state: AppState) => {
  const currentUserId = selectCurrentUser(state).account.id;
  return selectStartups(state).filter(startup => startup.account.id !== currentUserId);
};

export const isLoading = (state: AppState) => state.startupsState.isLoading;

export const selectStartupById = (state: AppState, startupId: string) => {
  const startup = state.startupsState.startups.get(startupId);
  return startup ? startup : defaultStartup;
};

// Startup-page state
export const selectStartupFromState = (state: AppState) => {
  return state.startupPageState.startupModel;
};

export const selectStartupForEdit = (state: AppState) => {
  const startup = state.startupPageState.startupModel;
  return startup ? startup : defaultStartup;
};

export const isSelected = (state: AppState) => state.startupPageState.isSelected;
