import axios, { AxiosResponse } from 'axios'
import { uri, API } from '@global'
import { LoginAPI, RegisterAPI, AuthenticationInformation } from '../types'

export async function loginAPI(
  data: AuthenticationInformation
): Promise<LoginAPI> {
  return await axios
    .post(uri.getHostingServer('/api/auth/login'), data)
    .then((res: AxiosResponse) => res.data)
    .catch((err: any) => err.response.data)
}

export async function registerAPI(
  data: AuthenticationInformation
): Promise<RegisterAPI> {
  return await axios
    .post(uri.getHostingServer('/api/auth/register'), data)
    .then((res: AxiosResponse) => res.data)
    .catch((err: any) => err.response.data)
}

export async function sendResetEmailAPI(
  data: AuthenticationInformation
): Promise<API> {
  return await axios
    .post(uri.getHostingServer('/api/send-email'), data)
    .then((res: AxiosResponse) => res.data)
    .catch((err: any) => err.response.data)
}
