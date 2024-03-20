import { HTMLProps } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

// Typescript
export interface ReactProps {
  children?: React.ReactNode;
  className?: HTMLProps<HTMLElement>['className'] | string;
  onClick?: (e: React.MouseEvent) => void;
  onExit?: () => void;
  [key: string]: any;
}

// React-Toastify
export type ToastTypeStrings = 'success' | 'error' | 'info' | 'warning' | 'loading';

// react-hook-form
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
    [key: string]: string;
  };

  register?: UseFormRegister<AuthenticationInformation>;
  errors?: FieldError | undefined;
  validation?: {};
};
