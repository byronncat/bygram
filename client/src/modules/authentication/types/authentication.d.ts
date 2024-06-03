export interface AuthenticationInformation {
  username?: string;
  password?: string;
  email?: string;
}
export type AuthenticationInformationStrings = keyof AuthenticationInformation;
