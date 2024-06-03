import { createContext, useContext } from 'react';
import clsx from 'clsx';
import styles from '../styles/layouts/authentication.module.sass';
import type { ReactProps } from '@global';

const className = {
  form: clsx(
    styles['form-background'],
    'max-w-full w-100 p-10 pb-8',
    'rounded-lg shadow-xl',
  ),
  formField: 'relative my-3',
  formInput: clsx(
    'block w-full px-3 pt-5 pb-2',
    'rounded bg-gray-50 dark:bg-gray-700 border-0 border-b-2 appearance-none border-gray-600',
    'text-white text-sm',
    'transition duration-300',
    'focus:border-slate-400 focus:outline-none focus:ring-0 peer',
  ),
  formLabel: clsx(
    'absolute start-3 top-4 z-10',
    'text-gray-400 text-sm',
    'duration-300 -translate-y-4 scale-75 origin-[0]',
    'peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4',
  ),
  formErrorMessage: clsx('mt-1 mb-2', 'font-medium text-sm text-neon-red'),
  formErrorMessageAnimation: 'flicker-once',
};

const ClassNameContext = createContext(
  {} as { className: Record<string, string> },
);
export const useClassNameContext = () => useContext(ClassNameContext);

export default function ClassNameProvider({ children }: ReactProps) {
  return (
    <ClassNameContext.Provider value={{ className }}>
      {children}
    </ClassNameContext.Provider>
  );
}
