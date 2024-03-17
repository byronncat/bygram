import { API, Credentials } from '@types';

export interface LoginAPI extends API {
  data: Credentials;
}

export interface RegisterAPI extends API {
  data: Credentials;
}
