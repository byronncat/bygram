import { ObjectId } from 'mongoose';

// Entity
export interface Account {
  id?: number;
  email?: string;
  password?: string;
}

interface Profile {
  uid?: Account['id'];
  username?: string;
  followers?: Account['id'][];
  followings?: Account['id'][];
  avatar?: string;
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
export interface API {
  success: boolean;
  message: string;
  data?: any;
}

export interface Credentials {
  id?: number;
  email?: string;
}

interface Condition {
  and?: boolean;
  or?: boolean;
  one?: boolean;
}
