import { createContext, useContext } from 'react';
import clsx from 'clsx';
import { ReactProps } from '@global';
import styles from '../styles/layouts/auth.module.sass';
import effects from '@sass/effects.module.sass';

const className = {
  form: 'mw-100 rounded',
  formField: clsx(styles['form-field'], 'form-field form-floating'),
  formInput: clsx(styles['form-input'], 'form-control'),
  formLabel: clsx(styles['form-label']),
  formErrorMessage: clsx(styles['error-message'], 'mt-1 mb-2'),
  formErrorMessageAnimation: clsx(effects['flicker-one']),
};

const AuthLayoutContext = createContext({} as { className: Record<string, string> });
export const useAuthLayoutContext = () => useContext(AuthLayoutContext);

export default function Auth({ children }: ReactProps) {
  return <AuthLayoutContext.Provider value={{ className }}>{children}</AuthLayoutContext.Provider>;
}
