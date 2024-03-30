import { CommentData } from './layout.d';

export type UserToken = {
  id: number;
  email: string;
};

export interface Post {
  id?: string;
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

export interface File {
  dataURL: string;
  sizeType: 'landscape' | 'portrait';
}

export interface Profile {
  uid: UserToken['id'];
  username: string;
  followers: UserToken['id'][];
  followings: UserToken['id'][];
  avatar?: File;
}
