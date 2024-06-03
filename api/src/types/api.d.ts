import type { Account, Profile } from '@types';

export interface API {
  success: boolean;
  message: string;
}

export type SearchProfileData = Pick<Account, 'id' | 'username'> &
  Pick<Profile, 'avatar'>;
