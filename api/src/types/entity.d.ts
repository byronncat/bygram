import type { Account } from './authentication';

export interface Post {
  uid?: Account['id'];
  content?: string;
  file?: File;
  likes?: Account['id'][];
  comments?: Comment[];
  createdAt?: Date;
}

export interface Profile {
  uid: Account['id'];
  followers: Account['id'][];
  followings: Account['id'][];
  avatar?: File;
  description?: string;
}

export interface File {
  url: string;
  orientation: 'landscape' | 'portrait' | 'square';
}
