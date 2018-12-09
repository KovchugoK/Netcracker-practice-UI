import {Resume} from "./Resume";
import {Education} from "./Education";
import {Startup} from "./Startup";
import {WorkExperience} from "./WorkExperience";
import {User} from "./User";

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
  imageId: string;
  compressedImageId: string;
  user: User;
}

export const defaultAccount: Account = {
  id: null,
  birthday: null,
  firstName: '',
  lastName: '',
  email: '',
  aboutMe: '',
  resumes: null,
  yourContact: '',
  otherContact: null,
  startups: null,
  startupRoles: null,
  favorites: null,
  workExperiences:null,
  educations: null,
  imageId: '',
  compressedImageId: '',
  user: null
};
