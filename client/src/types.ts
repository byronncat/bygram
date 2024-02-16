import { FieldError, UseFormRegister } from "react-hook-form";

export type AuthenticationInformationProps = "username" | "password" | "confirmPassword" | "email";
export type AuthenticationInformation = {
  username?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
};

export type FormFieldProps = {
  key?: string;
  type: string;
  placeholder: string;
  name: AuthenticationInformationProps;

  // react-hook-form
  register?: UseFormRegister<AuthenticationInformation>;
  errors?: FieldError | undefined;
  validation?: {};
};

export interface Credentials {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: Credentials | null;
}