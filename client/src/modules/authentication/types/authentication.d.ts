export interface AuthenticationInformation {
  username?: string;
  password?: string;
  email?: string;
}
export type AuthenticationInformationStrings = keyof AuthenticationInformation;

export type SessionId = string;

export type UserData = {
  id: number;
  username: string;
  email: string;
};
