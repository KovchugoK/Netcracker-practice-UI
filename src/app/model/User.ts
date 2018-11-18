import {Account} from './Account';

export interface User {
  id: string;
  login: string;
  password?: string;
  email?: string;
  token?: Token;
  account?: Account;
}
