import { API, Account, Credentials } from '@types';

export interface UserToken {
  id?: number;
  username?: string;
  email?: string;
}

export interface RegisterData extends Account {
  username: string;
}

export interface API {
  success: boolean;
  message: string;
  data?: any;
}

export interface LoginAPI extends API {
  data: UserToken;
}

export interface RegisterAPI extends API {
  data: UserToken;
}
