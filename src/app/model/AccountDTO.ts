import {BusinessRole} from "./BusinessRole";
import {Account} from "./Account";
import {ResumeSkill} from "./ResumeSkill";

export interface AccountDTO {
  account: Account;
  businessRole: BusinessRole;
  resumeSkillSet: ResumeSkill[];
}
