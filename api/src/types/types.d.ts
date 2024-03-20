import { ObjectId } from 'mongoose';

// Entity
interface Profile {
  uid?: Account['id'];
  username?: string;
  followers?: Account['id'][];
  followings?: Account['id'][];
  avatar?: File;
  description?: string;
}

export interface Post {
  uid?: Account['id'];
  content?: string;
  file?: File;
  likes?: Account['id'][];
  comments?: Comment[];
  createdAt?: Date;
}

export interface File {
  dataURL?: string;
  sizeType?: 'Landscape' | 'Portrait' | 'Square';
}

export interface Comment {
  uid?: Account['id'];
  content?: string;
  createdAt?: Date;
}

// Frontend API

interface Condition {
  and?: boolean;
  or?: boolean;
  one?: boolean;
}
