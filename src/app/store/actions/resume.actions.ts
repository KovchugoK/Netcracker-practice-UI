import {Resume} from '../../model/Resume';
import {SearchObject} from '../../model/SearchObject';
import {Favorite} from "../../model/Favorite";


export const FETCH_RESUMES = '[Resume] Fetch resumes specialist';
export const FETCH_RESUMES_SUCCESS = '[Resume] Fetch resumes specialist success';
export const FETCH_RESUMES_FAILED = '[Resumes] Fetch resumes specialist failed';
export const FETCH_RESUMES_SPECIALISTS = '[Resume] Fetch resumes spesialists';
export const FETCH_RESUMES_SPECIALISTS_SUCCESS = '[Resume] Fetch resumes success';
export const FETCH_RESUMES_SPECIALISTS_FAILED = '[Resumes] Fetch resumes failed';
export const FETCH_RESUMES_INVESTORS = '[Resume] Fetch resumes investors';
export const FETCH_RESUMES_INVESTORS_SUCCESS = '[Resume] Fetch resumes investors success';
export const FETCH_RESUMES_INVESTORS_FAILED = '[Resumes] Fetch resumes failed';
export const UPDATE_RESUME = '[Resume] Update resume';
export const UPDATE_RESUME_SUCCESS = '[Resume] Update resume success';
export const CREATE_RESUME = '[Resumes] Create resume';
export const CREATE_RESUME_SUCCESS = '[Resumes] Create resume success';
export const DELETE_RESUME = '[Resume State] Delete resume';
export const DELETE_RESUME_SUCCESS = '[Resume State] Delete resume success';

export const SEARCH_RESUMES = '[Resumes] Search resumes';
export const SEARCH_RESUMES_SUCCESS = '[Resumes] Search resumes success';
export const FETCH_MY_RESUMES = '[Resumes] Fetch my resumes';
export const FETCH_MY_RESUMES_SUCCESS = '[Resumes] Fetch my resumes success';
export function fetchResumesAction() {
  return {
    type: FETCH_RESUMES
  };
}

export function fetchResumesSuccessAction(resumes: Map<string, Resume>) {
  return {
    type: FETCH_RESUMES_SUCCESS,
    payload: {resumes}
  };
}

export function fetchResumesFailedAction(errorMessage: string) {
  return {
    type: FETCH_RESUMES_FAILED,
    payload: {errorMessage}
  };
}

export function fetchResumesSpecialistsAction(searchObj: SearchObject) {
  return {
    type: FETCH_RESUMES_SPECIALISTS,
    payload: {searchObj}
  };
}

export function fetchResumesSpecialistsSuccessAction(resumes: Map<string, Resume>) {
  return {
    type: FETCH_RESUMES_SPECIALISTS_SUCCESS,
    payload: {resumes}
  };
}

export function fetchResumesSpecialistsFaildAction(errorMessage: string) {
  return {
    type: FETCH_RESUMES_SPECIALISTS_FAILED,
    payload: {errorMessage}
  };
}

export function fetchResumesInvestorstsAction() {
  return {
    type: FETCH_RESUMES_INVESTORS,
  };
}

export function fetchResumesInvestorsSuccessAction(resumes: Map<string, Resume>) {
  return {
    type: FETCH_RESUMES_INVESTORS_SUCCESS,
    payload: {resumes}
  };
}

export function fetchResumesInvestorsFaildAction(errorMessage: string) {
  return {
    type: FETCH_RESUMES_INVESTORS_FAILED,
    payload: {errorMessage}
  };
}


export function updateResumeAction(resume: Resume) {
  return {
    type: UPDATE_RESUME,
    payload: {resume}
  };
}

export function updateResumeSuccessAction(resume: Resume) {
  return {
    type: UPDATE_RESUME_SUCCESS,
    payload: {resume}
  };
}

export function createResumeAction(resume: Resume) {
  return {
    type: CREATE_RESUME,
    payload: {resume}
  };
}

export function createResumeSuccessAction(resume: Resume) {
  return {
    type: CREATE_RESUME_SUCCESS,
    payload: {resume}
  };
}

export function deleteResumeAction(resumeId: string) {
  return {
    type: DELETE_RESUME,
    payload: {resumeId}
  };
}

export function deleteResumeSuccessAction(resumeId: string) {
  return {
    type: DELETE_RESUME_SUCCESS,
    payload: {resumeId}
  };
}


export function searchResumesAction(searchObj: SearchObject) {
  return {
    type: SEARCH_RESUMES,
    payload: {searchObj}
  };
}

export function searchResumesSuccessAction(resumes: Map<string, Resume>) {
  return {
    type: SEARCH_RESUMES_SUCCESS,
    payload: {resumes}
  };
}

export function fetchMyResumesAction(accountId: String) {
  return {
    type: FETCH_MY_RESUMES,
    payload: {accountId}
  };
}

export function fetchMyResumesSuccessAction(resumes: Map<string, Resume>) {
  return {
    type: FETCH_MY_RESUMES_SUCCESS,
    payload: {resumes}
  };
}


