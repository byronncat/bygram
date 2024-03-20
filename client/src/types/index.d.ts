export * from './backend';
export * from './entity';
export * from './library';

export type Direction = 'left' | 'right' | 'up' | 'down';

// Entities
export interface Post {
  id?: string;
  uid: UserToken['id'];
  content: string;
  file: File;
  createdAt?: string;
  likes?: number[];
  comments?: Comment[];
}

export interface File {
  dataURL: string;
  sizeType: 'Landscape' | 'Portrait' | 'Square';
}

export interface Profile {
  uid: UserToken['id'];
  username: string;
  followers: UserToken['id'][];
  followings: UserToken['id'][];
  avatar?: File;
}
