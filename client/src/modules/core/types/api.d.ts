import type { Post, Profile, User } from './entities';

export type SearchProfileData = Pick<Profile, 'avatar'> &
  Pick<User, 'id' | 'username'>;

export type ProfileData = Profile & Pick<User, 'username' | 'email'>;
