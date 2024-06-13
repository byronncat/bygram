import axios, { AxiosResponse } from 'axios';
import { uri, API_v1 } from '@global';
import { AuthenticationInformation } from '../types';

export async function loginAPI(
  data: AuthenticationInformation,
): Promise<API_v1> {
  return await axios
    .post(uri.getHostingServer('login'), data)
    .then((res: AxiosResponse) => res.data)
    .catch((err: any) => err.response.data);
}

export async function registerAPI(
  data: AuthenticationInformation,
): Promise<API_v1> {
  return await axios
    .post(uri.getHostingServer('register'), data)
    .then((res: AxiosResponse) => res.data)
    .catch((err: any) => err.response.data);
}

export async function authenticateAPI(): Promise<API_v1> {
  return await axios
    .get(uri.getHostingServer('authenticate'))
    .then((res: AxiosResponse) => res.data)
    .catch((err: any) => err.response.data);
}

export async function logoutAPI(): Promise<API_v1> {
  return await axios
    .delete(uri.getHostingServer('logout'))
    .then((res: AxiosResponse) => res.data)
    .catch((err: any) => err.response.data);
}
