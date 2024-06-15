import axios from 'axios';
import { uri } from '@global';
import { AuthenticationApiPath } from '../constants';

import type { AxiosResponse } from 'axios';
import type { API } from '@global';
import type { AuthenticationInformation } from '../types';

const login = async (data: AuthenticationInformation): Promise<API> => {
  return await axios
    .post(uri.getHostingServer(AuthenticationApiPath.login), data)
    .then((res: AxiosResponse) => res.data)
    .catch((error) => error.response.data);
};

const register = async (data: AuthenticationInformation): Promise<API> => {
  return await axios
    .post(uri.getHostingServer(AuthenticationApiPath.register), data)
    .then((res: AxiosResponse) => res.data)
    .catch((error) => error.response.data);
};

const authenticate = async (): Promise<API> => {
  return await axios
    .get(uri.getHostingServer(AuthenticationApiPath.authenticate))
    .then((res: AxiosResponse) => res.data)
    .catch((error) => error.response.data);
};

const logout = async (): Promise<API> => {
  return await axios
    .delete(uri.getHostingServer(AuthenticationApiPath.logout))
    .then((res: AxiosResponse) => res.data)
    .catch((error) => error.response.data);
};

export const authenticationApi = {
  login,
  register,
  authenticate,
  logout,
};
