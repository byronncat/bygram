import { FormFieldProps } from '../types'

const Validation = {
  User: {
    minLength: {
      value: 3,
      message: 'Username must be at least 3 characters',
    },
  },
  Password: {
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters',
    },
  },
  Email: {
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Wrong email format',
    },
  },
}

for (const key in Validation) {
  Validation[key].required = `${key} is required`
}

export const LOGIN = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    validation: Validation.Email,
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    validation: Validation.Password,
  },
] as FormFieldProps[]

export const REGISTER = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    validation: Validation.Email,
  },
  {
    name: 'username',
    type: 'text',
    placeholder: 'Username',
    validation: Validation.User,
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    validation: Validation.Password,
  },
] as FormFieldProps[]

export const SEND_EMAIL = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    validation: Validation.Email,
  },
] as FormFieldProps[]
