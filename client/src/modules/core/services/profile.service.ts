import axios from 'axios';
import { uri, API_v1 } from '@global';
import { AvatarAPI, ProfileAPI } from '../types';

type UserToken = { id: number };

export async function getProfile(uid: UserToken['id']): Promise<ProfileAPI> {
  return await axios
    .get(uri.getHostingServer(`profile/${uid}`))
    .then((res) => res.data)
    .catch((error: any) => error.response.data);
}

export async function changeAvatar(
  uid: UserToken['id'],
  file: File,
): Promise<AvatarAPI> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('uid', uid.toString());
  return await axios
    .put(uri.getHostingServer('profile/avatar'), formData)
    .then((res) => res.data)
    .catch((error: any) => error.response.data);
}

export async function removeAvatar(uid: UserToken['id']): Promise<API_v1> {
  return await axios
    .put(uri.getHostingServer('profile/avatar?type=remove'), { uid })
    .then((res) => res.data)
    .catch((error: any) => error.response.data);
}

export async function follow(
  uid: UserToken['id'],
  target: UserToken['id'],
): Promise<API_v1> {
  return await axios
    .put(uri.getHostingServer('profile/follow'), { uid, target })
    .then((res) => res.data)
    .catch((error: any) => error.response.data);
}

export async function unfollow(
  uid: UserToken['id'],
  target: UserToken['id'],
): Promise<API_v1> {
  return await axios
    .put(uri.getHostingServer('profile/unfollow'), { uid, target })
    .then((res) => res.data)
    .catch((error: any) => error.response.data);
}
