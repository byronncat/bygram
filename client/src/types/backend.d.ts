import { API, UserToken } from '@types';

export interface API {
  success: boolean;
  message: string;
}

export interface LoginAPI extends API {
  data?: UserToken;
}

export interface RegisterAPI extends API {
  data?: UserToken;
}
