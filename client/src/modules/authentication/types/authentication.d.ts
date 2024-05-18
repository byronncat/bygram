export interface AuthenticationInformation {
  username?: string;
  password?: string;
  email?: string;
}
export type AuthenticationInformationStrings = keyof AuthenticationInformation;

export type UserData = {
  id: number;
  username: string;
  email: string;
};
