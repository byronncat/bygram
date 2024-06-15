import type { Account, Profile } from '@types';

export type API<DataType = undefined> = {
  readonly success: boolean;
  readonly message: string;
} & (DataType extends undefined ? {} : { readonly data: DataType });

export type SearchProfileData = Pick<Account, 'id' | 'username'> &
  Pick<Profile, 'avatar'>;

export type GetProfileData = Profile & Pick<Account, 'username' | 'email'>;
