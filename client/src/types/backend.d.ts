import { API, Profile, Post, UserToken, Comment } from '@types';

export interface PostData extends Pick<Profile, 'avatar' | 'username' | 'uid'>, Post {}
export interface CommentData extends Pick<Profile, 'avatar' | 'username'>, Comment {}
export interface ProfileData extends Profile {
  posts?: PostData[];
}

export interface API {
  success: boolean;
  message: string;
}

export interface LoginAPI extends API {
  data?: UserToken;
}

export interface RegisterAPI extends API {
  data?: UserToken;
}

export interface SearchAPI extends API {
  data?: Profile[];
}

export interface PostAPI extends API {
  data?: PostData[];
}

export interface CommentAPI extends API {
  data?: CommentData[];
}

export interface AvatarAPI extends API {
  data?: Profile['avatar'];
}

export interface ProfileAPI extends API {
  data?: Profile;
}
