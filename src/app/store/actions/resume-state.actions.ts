import {Resume} from '../../model/Resume';
import {SELECT_ACCOUNT, SELECT_ACCOUNT_SUCCESS} from "./account-state.actions";

export const SELECT_RESUME = '[Resume State] Select resume';
export const SELECT_RESUME_SUCCESS = '[Resume State] Select resume success';

export function selectResume(resumeId: string) {
  return {
    type: SELECT_RESUME,
    payload: {resumeId}
  };
}

export function selectResumeSuccess(resume: Resume) {
  return {
    type: SELECT_RESUME_SUCCESS,
    payload: {resume}
  };
}

export function addToFav(accountId: string) {
  return {
    type: SELECT_ACCOUNT,
    payload: {accountId}
  };
}

export function addToFavSuccess(account: Account) {
  return {
    type: SELECT_ACCOUNT_SUCCESS,
    payload: {account}
  };
}
