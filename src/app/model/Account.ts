import {Education} from './Education';
import {WorkExperience} from './WorkExperience';

export interface Account {
  id: string;
  firstName: string;
  secondName: string;
  birthday: string;
  aboutMe: string;
  educations: Education[];
  workExperiences: WorkExperience[];
}
