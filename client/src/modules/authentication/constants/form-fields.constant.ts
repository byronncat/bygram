import { FormFieldProps } from '../types';

interface Validation {
  [key: string]: {
    minLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
    required?: string;
  };
}

export const REQUIREMENTS = {
  Username: [
    'At least 2 characters',
    'Only letters, numbers, underscores, dots, and hyphens',
  ],
  Password: ['At least 6 characters '],
};

const VALIDATION: Validation = {
  USER: {
    required: 'Username is required',
    minLength: {
      value: 2,
      message: 'Username must be at least 2 characters',
    },
    pattern: {
      value: /^[a-zA-Z0-9.\-_]+$/,
      message:
        'Username must contain only letters, numbers, underscores, dots, and hyphens',
    },
  },
  PASSWORD: {
    required: 'Password is required',
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters',
    },
  },
  EMAIL: {
    required: 'Email is required',
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Wrong email format',
    },
  },
};

export const LOGIN = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    validation: VALIDATION.EMAIL,
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
