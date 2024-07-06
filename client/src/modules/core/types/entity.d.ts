import type { User } from '@global';
import { CommentData } from './layout';

export interface Post extends Pick<Profile, 'avatar'>, Pick<User, 'username'> {
  id: string;
  uid: User['id'];
  content: string;
  files: MediaInfo[];
  createdAt: string;
  likes: number[];
  comments: CommentData[];
}

export interface Profile {
  uid: User['id'];
  followers: User['id'][];
  followings: User['id'][];
  avatar?: MediaInfo;
  description?: string;
}

export interface Comment {
  id: string;
  uid: UserToken['id'];
  content: string;
  createdAt?: string;
}

export type CloudinaryUploadResponse = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  type: 'upload';
  placeholder: boolean;
  url: string;
  secure_url: string;
  asset_folder: string;
  display_name: string;
  original_filename: string;
};

export type MediaInfo = {
  id: CloudinaryUploadResponse['public_id'];
  url: CloudinaryUploadResponse['secure_url'];
  type: 'image' | 'video';
  orientation: 'landscape' | 'portrait' | 'square';
};

export type UploadedFile = {
  url: string | ArrayBuffer | null;
  type: CloudinaryUploadResponse['resource_type'];
} & MediaInfo;
