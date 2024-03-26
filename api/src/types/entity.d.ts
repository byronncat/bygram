// Passport
export type LoginMessage = 'No user found' | 'Incorrect password' | 'Logged in successfully';
export type RegisterMessage = 'Username already exists' | 'Email already exists' | 'Can register';
export type AuthenticationAPI = {
  user: Account | null;
  message: LoginMessage | RegisterMessage;
};

// Main
export interface Account {
  id?: number;
  email?: string;
  password?: string;
}

export interface Post {
  uid?: Account['id'];
  content?: string;
  file?: File;
  likes?: Account['id'][];
  comments?: Comment[];
  createdAt?: Date;
}

interface Profile {
  uid?: Account['id'];
  username?: string;
  followers?: Account['id'][];
  followings?: Account['id'][];
  avatar?: File;
  description?: string;
}

export interface File {
  dataURL?: string;
  sizeType?: 'landscape' | 'portrait';
}
