import { FormFieldProps } from '../types';

interface Validation {
  [key: string]: {
    minLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
    required?: string;
  };
}

const VALIDATION: Validation = {
  USER: {
    minLength: {
      value: 3,
      message: 'Username must be at least 3 characters',
    },
  },
  PASSWORD: {
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters',
    },
  },
  EMAIL: {
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Wrong email format',
    },
  },
};

for (const key in VALIDATION) {
  VALIDATION[key].required = `${key} is required`;
}

export const LOGIN = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    validation: VALIDATION.USER,
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    validation: VALIDATION.PASSWORD,
  },
] as FormFieldProps[];

export const REGISTER = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    validation: VALIDATION.EMAIL,
  },
  {
    name: 'username',
    type: 'text',
    placeholder: 'Username',
    validation: VALIDATION.USER,
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    validation: VALIDATION.PASSWORD,
  },
] as FormFieldProps[];

export const SEND_EMAIL = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    validation: VALIDATION.EMAIL,
  },
] as FormFieldProps[];
