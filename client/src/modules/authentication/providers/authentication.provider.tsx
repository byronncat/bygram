import { useState, useContext, createContext } from 'react'
import { AuthenticationToken, ReactProps } from '@global/types'

const AuthenticationContext = createContext(
  {} as {
    authenticationToken: AuthenticationToken
    handleChangeAuthentication: (data: AuthenticationToken) => void
  }
)

// TODO: Add classes and divide the context into two separate contexts
interface AuthenticationContextProps extends ReactProps {
  initToken?: AuthenticationToken
}
export default function AuthenticationProvider({
  children,
  initToken,
}: AuthenticationContextProps) {
  const [authenticationToken, setAuthenticationToken] =
    useState<AuthenticationToken>(
      initToken || {
        identity: localStorage.getItem('user')
          ? JSON.parse(localStorage.getItem('user') as string)
          : null,
        isAuthenticated:
          localStorage.getItem('isAuthenticated') === 'true' ? true : false,
      }
    )

  function handleChangeAuthentication({
    identity,
    isAuthenticated,
  }: AuthenticationToken) {
    setAuthenticationToken({
      identity,
      isAuthenticated,
    })
    localStorage.setItem('user', JSON.stringify(identity))
    localStorage.setItem('isAuthenticated', isAuthenticated.toString())
  }

  return (
    <AuthenticationContext.Provider
      value={{
        authenticationToken,
        handleChangeAuthentication,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}

export function useAuthenticationContext() {
  return useContext(AuthenticationContext)
}
