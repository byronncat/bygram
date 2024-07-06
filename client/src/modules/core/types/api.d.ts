import type { Post, Profile, MediaInfo } from './entity';
import type { User } from '@global';

export type SearchProfileData = Pick<Profile, 'avatar'> &
  Pick<User, 'id' | 'username'>;

export type ProfileData = Profile & Pick<User, 'username' | 'email'>;

export type PostUploadData = {
  content: Post['content'];
  files: MediaInfo[];
};
