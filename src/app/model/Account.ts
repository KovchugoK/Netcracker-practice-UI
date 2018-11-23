<<<<<<< HEAD
=======
import {Education} from './Education';
import {WorkExperience} from './WorkExperience';

>>>>>>> dev
export interface Account {
  id: string;
  firstName: string;
  lastName: string;
  birthday: string;
  aboutMe: string;
  educations: Education[];
  workExperiences: WorkExperience[];
}
