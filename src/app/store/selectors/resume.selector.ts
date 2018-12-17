import {AppState} from '../index';
import {defaultResume} from "../../model/Resume";

// Resumes state
export const selectResumes = (state: AppState) => Array.from(state.resumeState.resumes.values());

export const isLoading = (state: AppState) => state.resumeState.isLoading;

export const selectResumeById = (state: AppState, resumeId: string) => {
  const resume = state.resumeState.resumes.get(resumeId);
  return resume;
};

//Resume-page state
export const selectResumeFromState = (state: AppState) => {
  return state.resumePageState.resumeModel;
};

export const selectResumeForEdit = (state: AppState) => {
  const resume = state.resumePageState.resumeModel;
  return resume ? resume : defaultResume;
};

export const isSelected = (state: AppState) => state.resumePageState.isSelected;

