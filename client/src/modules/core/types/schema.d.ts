import { CommentData } from './layout';

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export interface Post {
  id: string;
  uid: UserToken['id'];
  content: string;
  file: File;
  createdAt?: string;
  likes?: number[];
  comments?: CommentData[];
}

export interface Comment {
  id: string;
  uid: UserToken['id'];
  content: string;
  createdAt?: string;
}

export interface Profile {
  uid: User['id'];
  followers: User['id'][];
  followings: User['id'][];
  avatar?: File;
  description?: string;
}

export interface File {
  url: string;
  orientation: 'landscape' | 'portrait' | 'square';
}
