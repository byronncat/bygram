import axios, { AxiosResponse } from 'axios';
import { API, AuthenticationInformation, LoginAPI, RegisterAPI } from '@types';

export async function loginAPI(data: AuthenticationInformation): Promise<LoginAPI> {
  let response: LoginAPI = await axios
    .post('/api/auth/login', data)
    .then((res: AxiosResponse) => {
      return res.data;
    })
    .catch((err: any) => {
      return err.response.data;
    });
  return response;
}

export async function registerAPI(data: AuthenticationInformation): Promise<RegisterAPI> {
  let response: RegisterAPI = await axios
    .post('/api/auth/register', data)
    .then((res: AxiosResponse) => {
      return res.data;
    })
    .catch((err: any) => {
      return err.response.data;
    });
  return response;
}

export async function sendResetEmailAPI(data: AuthenticationInformation): Promise<API> {
  let response: API = await axios
    .post('/api/send-email', data)
    .then((res: AxiosResponse) => {
      return res.data;
    })
    .catch((err: any) => {
      return err.response.data;
    });
  return response;
}
