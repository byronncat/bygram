import { FieldError, UseFormRegister } from 'react-hook-form';

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
    field?: string;
    input?: string;
    label?: string;
    errorMessage?: string;
  };

  register?: UseFormRegister<AuthenticationInformation>;
  errors?: FieldError | undefined;
  validation?: {};
};

// Authentication
export type AuthenticationStorage = {
  isAuthenticated: boolean;
  user: Credentials | null;
};

export interface Credentials {
  id?: number;
  username?: string;
  email?: string;
}

// Backend API
export interface API {
  success: boolean;
  message: string;
  data?: any;
}

// Entities
export interface Post {
  id?: string;
  uid: Credentials['id'];
  content: string;
  file: File;
  createdAt?: string;
  likes?: number[];
  comments?: Comment[];
}

export interface File {
  dataURL: string;
  sizeType: 'Landscape' | 'Portrait' | 'Square';
}
