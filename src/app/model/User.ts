import {Account} from './Account';
import {Role} from './Role';

export interface User {
  id: string;
  login: string;
  password?: string;
  email?: string;
  nonBlock: boolean;
  token?: Token;
  roles: Role[];
  account: Account;
}
