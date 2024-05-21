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
