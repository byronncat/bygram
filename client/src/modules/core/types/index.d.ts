import type { API } from '@global';
import { Profile, Post, UserToken, Comment } from './entity';
export * from './api.d';
export * from './entity.d';
export * from './layout.d';

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
