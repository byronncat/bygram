import { ObjectId } from "mongoose";

export interface IAccount {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
}

interface IProfile {
  uid?: IAccount["id"];
  avatar?: string;
}

export interface IPost {
  _id?: ObjectId;
  author?: IAccount["id"];
  content?: string;
  imgURL?: string;
  createdAt?: Date;
}

export interface IAPI {
  success: boolean;
  message: string;
  data?: any;
}

interface ICondition {
  and?: boolean;
  or?: boolean;
  one?: boolean;
}
