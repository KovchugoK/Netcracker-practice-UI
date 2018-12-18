import {Account} from './Account';
import {Startup} from './Startup';

export interface Investment {
  id: string;
  investor: Account;
  startup: Startup;
  sumOfInvestment: number;
}
