import {StartupResume} from './StartupResume';
import {Account} from './Account';

export interface Startup {
  id: string;
  startupName: string;
  idea: string;
  aboutProject: string;
  businessPlan: string;
  sumOfInvestment: number;
  account: Account;
  startupResumes: StartupResume[];
  dateOfCreation: Date;
}


export const defaultStartup: Startup = {
  id: null,
  startupName: '',
  idea: '',
  aboutProject: '',
  businessPlan: '',
  sumOfInvestment: 0,
  account: null,
  startupResumes: null,
  dateOfCreation: null
};
