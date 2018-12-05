import {Education} from './Education';
import {WorkExperience} from './WorkExperience';
import {User} from './User';

export interface Account {
  id: string;
  firstName: string;
  lastName: string;
  birthday: string;
  aboutMe: string;
  user: User;
  educations: Education[];
  workExperiences: WorkExperience[];
}
