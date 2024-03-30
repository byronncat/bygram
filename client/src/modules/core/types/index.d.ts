import { API } from '@global';
import { Profile, Post, UserToken, Comment } from './entity';
export * from './layout';
export * from './entity';

export interface PostUploadData {
  id?: string;
  uid?: number;
  content?: string;
  file?: File;
}

export interface PostData extends Pick<Profile, 'avatar' | 'username' | 'uid'>, Post {}
export interface CommentData extends Pick<Profile, 'avatar' | 'username'>, Comment {}
export interface ProfileData extends Profile {
  posts?: PostData[];
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
