import { API } from '@global';
export * from './form.d';

export interface AuthenticationInformation {
  username?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
}

export interface LoginAPI extends API {
  data?: UserToken;
}

export interface RegisterAPI extends API {
  data?: UserToken;
}
