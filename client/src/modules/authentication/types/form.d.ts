import { FieldError, UseFormRegister } from 'react-hook-form';
import { AuthenticationInformation } from '.';

export type AuthenticationInformationProps = 'username' | 'password' | 'confirmPassword' | 'email';
export type FormFieldProps = {
  key?: string;
  type: string;
  placeholder: string;
  name: AuthenticationInformationProps;
  className?: {
    [key: string]: string;
  };
  register?: UseFormRegister<AuthenticationInformation>;
  errors?: FieldError | undefined;
  validation?: {};
};
