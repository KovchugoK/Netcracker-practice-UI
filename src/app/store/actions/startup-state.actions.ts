import {Startup} from '../../model/Startup';
import {Resume} from '../../model/Resume';
import {Investment} from '../../model/Investment';
import {StartupResume} from '../../model/StartupResume';
import {Account} from '../../model/Account';

export const SELECT_STARTUP = '[Startup State] Select startup';
export const SELECT_STARTUP_SUCCESS = '[Startup State] Select startup success';
export const SEND_RESUME_TO_STARTUP = '[Startup State] Send resume to startup';
export const SEND_RESUME_TO_STARTUP_SUCCESS = '[Startup State] Send resume to startup success';
export const REJECT_RESUME_TO_STARTUP = '[Startup State] Reject resume to startup';

// export const SEND_RESUME_TO_STARTUP_SUCCESS = '[Startup State] Send resume to startup success';
export const ACCEPT_RESUME_TO_STARTUP = '[Startup State] Accept resume to startup';
export const CHANGE_STARTUP_MEMBER_ROLE = '[Startup State] Change startup member role';
export const KICK_MEMBER_FROM_STARTUP = '[Startup State] Kick member from startup';

// export const ACCEPT_RESUME_SUCCESS = '[Startup State] Accept resume success';
export const MAKE_INVESTMENT_IN_STARTUP = '[Startup State] Make investment in startup';
export const MAKE_INVESTMENT_IN_STARTUP_SUCCESS = '[Startup State] Make investment in startup success';


export function selectStartup(startupId: string) {
  return {
    type: SELECT_STARTUP,
    payload: {startupId}
  };
}

export function selectStartupSuccess(startup: Startup) {
  return {
    type: SELECT_STARTUP_SUCCESS,
    payload: {startup}
  };
}

export function sendResumeToStartupAction(resume: Resume) {
  return {
    type: SEND_RESUME_TO_STARTUP,
    payload: {resume}
  };
}

export function sendResumeToStartupSuccessAction(startupResume: StartupResume) {
  return {
    type: SEND_RESUME_TO_STARTUP_SUCCESS,
    payload: {startupResume}
  };
}

export function acceptResumeToStartupAction(startupResumeId: string, roleName: string, accountId) {
  return {
    type: ACCEPT_RESUME_TO_STARTUP,
    payload: {startupResumeId: startupResumeId, roleName: roleName, accountId: accountId}
  };
}

export function changeStartupMemberRoleAction(roleName: string, accountId: string) {
  return {
    type: CHANGE_STARTUP_MEMBER_ROLE,
    payload: {roleName: roleName, accountId: accountId}
  };
}

export function kickMemberFromStartupAction(startupResumeId: string, accountId: string) {
  return {
    type: KICK_MEMBER_FROM_STARTUP,
    payload: {startupResumeId: startupResumeId, accountId: accountId}
  };
}

export function makeInvestmentInStartupAction(investor: Account, startup: Startup, sumOfInvestment: number) {
  return {
    type: MAKE_INVESTMENT_IN_STARTUP,
    payload: {investor: investor, startup: startup, sumOfInvestment: sumOfInvestment}
  };
}

export function makeInvestmentInStartupSuccessAction(investment: Investment) {
  return {
    type: MAKE_INVESTMENT_IN_STARTUP_SUCCESS,
    payload: {investment}
  };
}


export function rejectResumeAction(startupResumeId: string) {
  return {
    type: REJECT_RESUME_TO_STARTUP,
    payload: {startupResumeId}
  };
}

