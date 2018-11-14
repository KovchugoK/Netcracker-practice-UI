import {ResumeSkill} from './ResumeSkill';
import {Account} from './Account';
import {BusinessRole} from './BusinessRole';

export interface Resume {
  id: string;
  resumeSkills: ResumeSkill[];
  businessRole: BusinessRole;
  account: Account;
}

