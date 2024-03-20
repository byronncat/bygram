// Passport
export type LoginMessage = 'No user found' | 'Incorrect password' | 'Logged in successfully';
export type RegisterMessage = 'Username already exists' | 'Email already exists' | 'Can register';
export type AuthenticationAPI = {
  user: Account | null;
  message: LoginMessage | RegisterMessage;
};

// Main
export interface Account {
  id?: number;
  email?: string;
  password?: string;
}
