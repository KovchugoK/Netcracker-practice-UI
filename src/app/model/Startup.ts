import {StartupResume} from './StartupResume';
import {Account} from './Account';

export class Startup {
  id: number;
  startupName: string;
  idea: string;
  aboutProject: string;
  businessPlan: string;
  sumOfInvestment: number;
  account: Account;
  startupResumes: StartupResume;
}
