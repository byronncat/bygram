import type { API } from '@global';
import { Profile, Post, UserToken, Comment } from './entities';
export * from './api.d';
export * from './entities.d';
export * from './layout.d';

export interface PostUploadData {
  id?: string;
  uid?: number;
  content?: string;
  file?: File;
}

export interface PostData
  extends Pick<Profile, 'avatar' | 'username' | 'uid'>,
    Post {}
export interface CommentData
  extends Pick<Profile, 'avatar' | 'username'>,
    Comment {}

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
