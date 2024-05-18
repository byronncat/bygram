import { LoginResult, RegisterResult } from '@constants';

export type Account = {
  id: string;
  email: string;
  username: string;
  password: string;
};

export type LoginMessage = `${LoginResult}`;
export type RegisterMessage = `${RegisterResult}`;

export type Identity = {
  userId: Account['id'] | null;
  message: LoginMessage | RegisterMessage;
};
