import type { API_v1 } from '@global';
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

export interface PostAPI extends API_v1 {
  data?: PostData[];
}

export interface CommentAPI extends API_v1 {
  data?: CommentData[];
}

export interface AvatarAPI extends API_v1 {
  data?: Profile['avatar'];
}

export interface ProfileAPI extends API_v1 {
  data?: Profile;
}
