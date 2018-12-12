import {Startup} from "./Startup";
import {User} from "./User";
import {Resume} from "./Resume";
import {WorkExperience} from "./WorkExperience";
import {Education} from "./Education";

export class DetailAccountDTO {
  id: string;
  birthday: Date;
  firstName: string;
  lastName: string;
  aboutMe: string;
  resumes: Resume[];
  startups: Startup[];
  startupRoles: {};
  favorites: {};
  workExperiences: WorkExperience[];
  educations: Education[];
  imageId: string;
  compressedImageId: string;
  user: User;
  image: string;
}
