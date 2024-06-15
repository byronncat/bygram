import { createContext, useContext } from 'react';
import clsx from 'clsx';
import type { ReactProps } from '@global';

const className = {
  form: clsx(
    'max-w-full w-100 p-10 pb-8',
    'rounded-lg shadow-2xl',
    'bg-on-background/[0.01] dark:bg-dark-on-background/[0.07]',
  ),
  formField: 'relative my-3',
  formInput: clsx(
    'block w-full px-3 pt-5 pb-2',
    'bg-on-background/[0.04] dark:bg-dark-on-background/[0.07]',
    'border-0 border-b-2 border-transparent',
    'rounded appearance-none',
    'text-on-background/[0.6] dark:text-dark-on-background/[0.6]',
    'transition duration-300',
    'focus:border-primary focus:outline-none focus:ring-0 peer',
    'focus:text-on-background/[0.8] dark:focus:text-dark-on-background',
    'dark:focus:border-dark-primary',
  ),
  formLabel: clsx(
    'absolute start-3 top-4 z-10',
    'text-on-background/[0.6] dark:text-dark-on-background/[0.6]',
    'duration-300 -translate-y-4 scale-75 origin-[0]',
    'peer-focus:text-on-background dark:peer-focus:text-dark-on-background',
    'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4',
  ),
  formErrorMessage: clsx(
    '-mt-2 mb-3',
    'font-medium text-sm',
    'text-error dark:text-dark-error',
  ),
  formErrorMessageAnimation: 'flicker-once',
};

const ClassNameContext = createContext(
  {} as { className: Record<string, string> },
);

const useClassNameContext = () => useContext(ClassNameContext);
const ClassName = ({ children }: ReactProps) => {
  return (
    <ClassNameContext.Provider value={{ className }}>
      {children}
    </ClassNameContext.Provider>
  );
};

export default ClassName;
export { useClassNameContext };
