import type { User } from '@global';
import { CommentData } from './layout';

export interface Post extends Pick<Profile, 'avatar'>, Pick<User, 'username'> {
  id: string;
  uid: User['id'];
  content: string;
  file: MediaInfo;
  createdAt: string;
  likes: number[];
  comments: CommentData[];
}

export interface Profile {
  uid: User['id'];
  followers: User['id'][];
  followings: User['id'][];
  avatar?: MediaInfo;
  description?: string;
}

export interface Comment {
  id: string;
  uid: UserToken['id'];
  content: string;
  createdAt?: string;
}

export interface MediaInfo {
  url: string;
  type: 'image' | 'video';
  orientation: 'landscape' | 'portrait' | 'square';
}

export type UploadedFile = {
  id: string;
  url: string | ArrayBuffer | null;
} & MediaInfo;
