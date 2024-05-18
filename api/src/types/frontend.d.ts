import { API, Account, Credentials, Post, Profile } from '@types';

export interface UserToken {
  id?: number;
  username?: string;
  email?: string;
}

export interface PostData
  extends Pick<Profile, 'username' | 'avatar'>,
    Omit<Post, 'comments'> {
  id?: string;
}

export interface CommentData
  extends Pick<Profile, 'username' | 'avatar'>,
    Comment {
  id: string;
}

export interface ProfileData extends Profile {
  posts?: PostData[];
}

export interface API {
  success: boolean;
  message: string;
}

export interface RegisterAPI extends API {
  data: UserToken;
}

export interface SearchProfileAPI extends API {
  data: Profile[];
}

export interface PostAPI extends API {
  data: PostData[];
}

export interface CommentAPI extends API {
  data: CommentData[];
}

export interface AvatarAPI extends API {
  data: Profile['avatar'];
}

export interface ProfileAPI extends API {
  data: ProfileData;
}
