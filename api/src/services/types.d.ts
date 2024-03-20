import { Account, Post } from '@types';

// API

export interface PostData extends Omit<Pick, 'username' | 'avatar'>, Post {
  id: string;
}
