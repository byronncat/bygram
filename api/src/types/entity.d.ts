import type { Account } from './authentication';

export type Post = {
  uid: Account['id'];
  content: string;
  files: MediaInfo[];
  likes: Account['id'][];
  comments: Comment[];
  createdAt: Date;
};

export type Profile = {
  uid: Account['id'];
  followers: Account['id'][];
  followings: Account['id'][];
  avatar?: MediaInfo;
  description?: string;
};

export type MediaInfo = {
  id: string;
  url: string;
  type: 'image' | 'video';
  orientation: 'landscape' | 'portrait' | 'square';
};
