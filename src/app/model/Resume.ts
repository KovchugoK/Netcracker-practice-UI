import {StartupResume} from "./StartupResume";
import {BusinessRole} from "./BusinessRole";
import {ResumeSkill} from "./ResumeSkill";

export class Resume {
  id: string;
  info: string;
  businessRole:BusinessRole;
  resumeSkills: ResumeSkill[];
  startupResumes: StartupResume[];

}
