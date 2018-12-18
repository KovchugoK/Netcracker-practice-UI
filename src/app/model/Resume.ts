import {ResumeSkill} from './ResumeSkill';
import {Account} from './Account';
import {BusinessRole} from './BusinessRole';
import {StartupResume} from "./StartupResume";
import {Skill} from "./Skill";

export interface Resume {
  id: string;
  info: string;
  resumeSkills: Skill[];
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
