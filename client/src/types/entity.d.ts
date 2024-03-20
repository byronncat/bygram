// Authentication
export type AuthenticationStorage = {
  isAuthenticated: boolean;
  user: UserToken | null;
};

export type UserToken = {
  id: number;
  email: string;
};
