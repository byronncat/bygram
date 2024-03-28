import axios from 'axios';
import { getURLServer } from './fetchAPI';
import { API, AvatarAPI, SearchAPI, UserToken } from '@types';
import { ProfileAPI } from '@types';

export async function getProfile(uid: UserToken['id']): Promise<ProfileAPI> {
  return await axios
    .get(getURLServer(`/api/profile/${uid}`))
    .then((res) => res.data)
    .catch((error: any) => error.response.data);
}

export async function searchProfile(searchInput: string): Promise<SearchAPI> {
  return await axios
    .get(getURLServer(`/api/profile/search/${searchInput}`))
    .then((res) => res.data)
    .catch((error: any) => error.response.data);
}

export async function changeAvatar(uid: UserToken['id'], file: File): Promise<AvatarAPI> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('uid', uid.toString());
  return await axios
    .put(getURLServer('/api/profile/avatar'), formData)
    .then((res) => res.data)
    .catch((error: any) => error.response.data);
}

export async function removeAvatar(uid: UserToken['id']): Promise<API> {
  return await axios
    .put(getURLServer('/api/profile/avatar?type=remove'), { uid })
    .then((res) => res.data)
    .catch((error: any) => error.response.data);
}

export async function follow(uid: UserToken['id'], target: UserToken['id']): Promise<API> {
  return await axios
    .put(getURLServer('/api/profile/follow'), { uid, target })
    .then((res) => res.data)
    .catch((error: any) => error.response.data);
}

export async function unfollow(uid: UserToken['id'], target: UserToken['id']): Promise<API> {
  return await axios
    .put(getURLServer('/api/profile/unfollow'), { uid, target })
    .then((res) => res.data)
    .catch((error: any) => error.response.data);
}
