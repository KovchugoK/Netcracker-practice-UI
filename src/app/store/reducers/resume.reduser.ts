import {Resume} from '../../model/Resume';
import {Reducer} from 'redux';
import {
  CREATE_RESUME, CREATE_RESUME_SUCCESS, DELETE_RESUME, DELETE_RESUME_SUCCESS, FETCH_RESUMES, FETCH_RESUMES_SPECIALISTS,
  FETCH_RESUMES_SPECIALISTS_SUCCESS,
  FETCH_RESUMES_SUCCESS,
  UPDATE_RESUME, UPDATE_RESUME_SUCCESS
} from '../actions/resume.actions';

export interface ResumeState {
  readonly resumes: Map<string, Resume>;
  readonly isLoading: boolean;
}

const INITIAL_STATE = {
  resumes: new Map<string, Resume>(),
  isLoading: false
};

export const resumeReducer: Reducer<ResumeState> = (state: ResumeState = INITIAL_STATE, action): ResumeState => {
  switch (action.type) {
    case FETCH_RESUMES_SPECIALISTS: {
      const {searchObj} = action.payload;
      return {...state, isLoading: true};
    }
    case FETCH_RESUMES: {
      return {...state, isLoading: true};
    }
    case FETCH_RESUMES_SPECIALISTS_SUCCESS:
    case FETCH_RESUMES_SUCCESS: {
      return {...state, ...action.payload, isLoading: false};
    }
    case CREATE_RESUME:
    case UPDATE_RESUME:
    case DELETE_RESUME: {
      return {...state, isLoading: true};
    }
    case CREATE_RESUME_SUCCESS:
    case UPDATE_RESUME_SUCCESS: {
      const {resume} = action.payload;
      const updatedResumes = new Map(state.resumes).set(resume.id, resume);
      return {...state, resumes: updatedResumes, isLoading: false};
    }
    case DELETE_RESUME_SUCCESS: {
      const {resumeId} = action.payload;
      const updatedResumes = new Map(state.resumes);
      updatedResumes.delete(resumeId);
      return {...state, resumes: updatedResumes, isLoading: false};
    }
    default: {
      return state;
    }
  }
};
