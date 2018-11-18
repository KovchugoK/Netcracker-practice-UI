export interface User {
  id: string;
  login: string;
  password?: string;
  email?: string;
  token?: Token;
  role?: string;
}
