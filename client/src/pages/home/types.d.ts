import { API, Post, Profile } from '@types';

interface HomePost extends Post {
  username?: string;
  avatar?: Profile['avatar'];
}

export interface HomeAPI extends API {
  data: HomePost[];
}

export interface ProfileAPI extends API {
  data: Profile;
}

export interface AvatarAPI extends API {
  data: Profile['avatar'];
}
