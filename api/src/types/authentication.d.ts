import { LoginResult, RegisterResult } from '@constants';

export type Account = {
  id: number;
  email: string;
  username: string;
  password: string;
};

export type UserToken = Omit<Account, 'password'>;

export type LoginMessage = `${LoginResult}`;
export type RegisterMessage = `${RegisterResult}`;

export type Identity = {
  user: UserToken | null;
  message: LoginMessage | RegisterMessage;
};
