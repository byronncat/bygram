import { ObjectId } from 'mongoose';

export interface Account {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
}

interface Profile {
  uid?: Account['id'];
  followers?: Account['id'][];
  followings?: Account['id'][];
  avatar?: string;
  description?: string;
}

export interface Post {
  _id?: ObjectId;
  author?: Account['id'];
  content?: string;
  imgURL?: string;
  createdAt?: Date;
}

export interface API {
  success: boolean;
  message: string;
  data?: any;
}

interface Condition {
  and?: boolean;
  or?: boolean;
  one?: boolean;
}
