import { FieldError, UseFormRegister } from 'react-hook-form';
import {
  AuthenticationInformation,
  AuthenticationInformationStrings,
} from './authentication';

export interface FormFieldProps {
  key?: string;
  type: string;
  placeholder: string;
  name: AuthenticationInformationStrings;
  className?: {
    [key: string]: string;
  };
  register?: UseFormRegister<AuthenticationInformation>;
  errors?: FieldError | undefined;
  validation?: {};
}
