import axios from 'axios';
import { uri } from '@global';
import type { API_v1 } from '@global';
import type {
  SearchProfileData,
  Post,
  Profile,
  User,
  ProfileData,
} from '../types';

interface SearchAPI extends API_v1 {
  data?: SearchProfileData[];
}
export async function searchAPI(username: string): Promise<SearchAPI> {
  return await axios
    .get(uri.getHostingServer(`profile/search/${username}`))
    .then((res) => res.data)
    .catch((error: any) => error.response.data);
}

interface GetProfileAPI extends API_v1 {
  data: ProfileData | null;
}

export async function getProfileAPI(
  username: User['username'],
  uid: User['id'],
): Promise<GetProfileAPI> {
  return await axios
    .get(uri.getHostingServer(`profile/${username}`), {
      headers: { uid },
    })
    .then((res) => res.data)
    .catch((error: any) => error.response.data);
}
