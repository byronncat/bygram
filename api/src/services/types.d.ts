import { Account, Post } from '@types';

// Passport
export type LoginMessage = 'No user found' | 'Incorrect password' | 'Logged in successfully';
export type RegisterMessage = 'Username already exists' | 'Email already exists' | 'Can register';
export type AuthenticationPassport = {
  user: Account | null;
  message: LoginMessage | RegisterMessage;
};

// API
export interface RegisterData extends Account {
  username: string;
}

export interface PostData extends Omit<Pick, 'username' | 'avatar'>, Post {
  id: string;
}
