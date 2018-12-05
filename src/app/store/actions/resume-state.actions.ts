import {Resume} from '../../model/Resume';

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


