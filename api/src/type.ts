export interface AccountSchema {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
};

export interface PostSchema {
  id?: number;
  author?: AccountSchema["id"];
  content?: string;
  imgURL?: string;
  created_at?: Date;
};