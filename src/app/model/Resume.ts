import {ResumeSkill} from './ResumeSkill';
import {Account} from './Account';
import {BusinessRole} from './BusinessRole';
import {StartupResume} from "./StartupResume";

export interface Resume {
  id: string;
  info: string;
  resumeSkills: ResumeSkill[];
  businessRole: BusinessRole;
  account: Account;
  startupResumes?: StartupResume[];
}

export const defaultResume: Resume = {
  id: null,
  info: '',
  resumeSkills: null,
  businessRole: null,
  account: null
}
