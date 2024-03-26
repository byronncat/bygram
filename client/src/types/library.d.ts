import { HTMLProps } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { AuthenticationInformation } from '@types';

// Typescript
export interface ReactProps {
  children?: React.ReactNode;
  className?: HTMLProps<HTMLElement>['className'] | string;
  zIndex?: number;
  onClick?: (e: React.MouseEvent) => void;
  onExit?: () => void;
  [key: string]: any;
}

// React-Toastify
export type ToastTypeStrings = 'success' | 'error' | 'info' | 'warning' | 'loading';

// react-hook-form
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

interface PostUploadData {
  id?: string;
  uid?: number;
  content?: string;
  file?: File;
}
