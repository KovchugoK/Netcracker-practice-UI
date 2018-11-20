import {Resume} from "./Resume";
import {Education} from "./Education";
import {Startup} from "./Startup";
import {WorkExperience} from "./WorkExperience";

export class Account {
  id: string;
  birthday: Date;
  firstName: string;
  lastName: string;
  email: string;
  aboutMe: string;
  resumes: Resume[];
  yourContact: string;
  otherContact: {};
  startups: Startup[];
  startupRoles: {};
  favorites: {};
  workExperiences: WorkExperience[];
  educations: Education[];
}
