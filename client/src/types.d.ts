import { FieldError, UseFormRegister } from 'react-hook-form';

export type AuthenticationInformationProps = 'username' | 'password' | 'confirmPassword' | 'email';
export interface AuthenticationInformation {
  username?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
}

export type FormFieldProps = {
  key?: string;
  type: string;
  placeholder: string;
  name: AuthenticationInformationProps;
  className?: {
    field?: string;
    input?: string;
    label?: string;
    errorMessage?: string;
  };

  // react-hook-form
  register?: UseFormRegister<AuthenticationInformation>;
  errors?: FieldError | undefined;
  validation?: {};
};

export type AuthenticationStorage = {
  isAuthenticated: boolean;
  user: Credentials | null;
};

export interface Credentials {
  id?: number;
  username?: string;
  email?: string;
}

export interface API {
  success: boolean;
  message: string;
  data?: any;
}
