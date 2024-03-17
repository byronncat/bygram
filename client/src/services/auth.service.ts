import axios, { AxiosResponse } from 'axios';
import { LoginAPI, RegisterAPI } from '@pages/auth/types';
import { API, AuthenticationInformation, Credentials } from '@types';

export async function loginAPI(data: AuthenticationInformation): Promise<LoginAPI | API> {
  let response: LoginAPI | API;
  await axios
    .post('/api/auth/login', data)
    .then((res: AxiosResponse) => {
      response = res.data;
    })
    .catch((err: any) => {
      response = err.response.data;
    });

  return response!;
}

export async function registerAPI(data: AuthenticationInformation): Promise<LoginAPI | API> {
  let response: RegisterAPI | API;
  await axios
    .post('/api/auth/register', data)
    .then((res: AxiosResponse) => {
      response = res.data;
    })
    .catch((err: any) => {
      response = err.response.data;
    });

  return response!;
}

export async function sendResetEmailAPI(data: Credentials): Promise<API> {
  let response: API;
  await axios
    .post('/api/auth/send-email', data)
    .then((res: AxiosResponse) => {
      response = res.data;
    })
    .catch((err: any) => {
      response = err.response.data;
    });

  return response!;
}
