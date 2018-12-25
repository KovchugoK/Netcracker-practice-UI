import {StartupResume} from './StartupResume';
import {Account} from './Account';
import {Investment} from './Investment';

export interface Startup {
  id: string;
  startupName: string;
  idea: string;
  aboutProject: string;
  businessPlan: string;
  sumOfInvestment: number;
  nonBlock: boolean;
  account: Account;
  startupResumes: StartupResume[];
  dateOfCreation: Date;
  imageId: string;
  compressedImageId: string;
  image: string;
  startupInvestments: Investment[];
  startupRoles: StartupRole[];
}

export const defaultStartup: Startup = {
  id: null,
  startupName: '',
  idea: '',
  aboutProject: '',
  businessPlan: '',
  nonBlock: true,
  sumOfInvestment: 0,
  account: null,
  startupResumes: [],
  dateOfCreation: null,
  imageId: '',
  compressedImageId: '',
  image: '',
  startupInvestments: [],
  startupRoles: []
};


