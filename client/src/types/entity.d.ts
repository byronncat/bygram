import { CommentData } from '@types';

// Authentication
export type AuthenticationStorage = {
  isAuthenticated: boolean;
  user: UserToken | null;
};

export interface AuthenticationInformation {
  username?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
}

export type UserToken = {
  id: number;
  email: string;
};

export interface Post {
  id?: string;
  uid: UserToken['id'];
  content: string;
  file: File;
  createdAt?: string;
  likes?: number[];
  comments?: CommentData[];
}

export interface Comment {
  id: string;
  uid: UserToken['id'];
  content: string;
  createdAt?: string;
}

export interface File {
  dataURL: string;
  sizeType: 'landscape' | 'portrait';
}

export interface Profile {
  uid: UserToken['id'];
  username: string;
  followers: UserToken['id'][];
  followings: UserToken['id'][];
  avatar?: File;
}

// Layout
export interface MenuItem {
  name: string;
  function?: (...args: any) => any;
  functionHandler: (...args: any) => any;
}

export type SidebarBtn = 'home' | 'search' | 'explore' | 'create post' | 'profile' | 'logout';
export interface SidebarLink {
  name: SidebarBtn;
  icon: string;
  path: string;
  notActive?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onExit?: () => void;
}
