import { createContext, useContext } from 'react'
import clsx from 'clsx'
import { ReactProps } from '@global'

import styles from '../styles/layouts/auth.module.sass'
import effects from '@sass/effects.module.sass'

const className = {
  form: 'mw-100 rounded',
  formField: clsx(styles['form-field'], 'form-field form-floating'),
  formInput: clsx(styles['form-input'], 'form-control'),
  formLabel: clsx(styles['form-label']),
  formErrorMessage: clsx(styles['error-message'], 'mt-1 mb-2', 'fw-bolder'),
  formErrorMessageAnimation: clsx(effects['flicker-one']),
}

const ClassNameContext = createContext(
  {} as { className: Record<string, string> }
)
export const useClassNameContext = () => useContext(ClassNameContext)

export default function ClassNameProvider({ children }: ReactProps) {
  return (
    <ClassNameContext.Provider value={{ className }}>
      {children}
    </ClassNameContext.Provider>
  )
}
