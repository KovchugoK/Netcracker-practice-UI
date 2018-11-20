import {StartupResume} from "./StartupResume";
import {BusinessRole} from "./BusinessRole";
import {Skill} from "./Skill";

export class Resume {
  id: string;
  info: string;
  businessRole:BusinessRole;
  resumeSkills: Skill[];
  startupResumes: StartupResume[];

}
