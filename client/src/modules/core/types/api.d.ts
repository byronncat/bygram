import type { Post, Profile, User } from './schema.d';

export type SearchProfileData = Pick<Profile, 'avatar'> &
  Pick<User, 'id' | 'username'>;
