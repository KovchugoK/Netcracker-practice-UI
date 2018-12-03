import {AppState} from '../index';
import {defaultStartup} from '../../model/Startup';

// Startups state
export const selectStartups = (state: AppState) => Array.from(state.startupsState.startups.values());

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
