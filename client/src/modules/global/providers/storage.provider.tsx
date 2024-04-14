import { useState, useContext, createContext } from 'react'
import { AuthenticationStorage, ReactProps } from '../types'

type StorageContext = {
  authenticationStorage: AuthenticationStorage
  setAuthenticationStorage: (data: AuthenticationStorage) => void
}
const STORAGE_CONTEXT = createContext({} as StorageContext)

export function StorageProvider({ children }: ReactProps) {
  const [authenticationStorage, setAuthenticationState] =
    useState<AuthenticationStorage>({
      user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user') as string)
        : null,
      isAuthenticated:
        localStorage.getItem('isAuthenticated') === 'true' ? true : false,
    })

  function setAuthenticationStorage({
    user,
    isAuthenticated,
  }: AuthenticationStorage) {
    setAuthenticationState({
      user,
      isAuthenticated,
    })
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('isAuthenticated', isAuthenticated.toString())
  }

  return (
    <STORAGE_CONTEXT.Provider
      value={{
        authenticationStorage,
        setAuthenticationStorage,
      }}
    >
      {children}
    </STORAGE_CONTEXT.Provider>
  )
}

export function useStorageContext() {
  return useContext(STORAGE_CONTEXT)
}
