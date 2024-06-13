import { useState, useContext, createContext, useEffect } from 'react';
import { useJwt } from 'react-jwt';
import Cookies from 'js-cookie';
import { authenticateAPI } from '../api';
import type { ReactProps } from '@global';
import type { User } from '@core';
const AuthenticationContext = createContext(
  {} as {
    isAuthenticated: boolean;
    setAuthenticatedState: React.Dispatch<React.SetStateAction<boolean>>;
    user: UserToken | null;
  },
);

interface UserToken extends Omit<User, 'password'> {
  iat: number;
}

export default function AuthenticationProvider({ children }: ReactProps) {
  const userCookie = Cookies.get('user');
  const [isAuthenticated, setAuthenticatedState] = useState(
    userCookie ? true : false,
  );
  const { decodedToken } = useJwt<UserToken>(userCookie || '');
  const [user, setUser] = useState<UserToken | null>(decodedToken);

  useEffect(() => {
    (async () => {
      const response = await authenticateAPI();
      setAuthenticatedState(response.success);
    })();
  }, []);

  useEffect(() => {
    if (decodedToken) setUser(decodedToken);
  }, [decodedToken]);

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        setAuthenticatedState,
        user,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthenticationContext() {
  return useContext(AuthenticationContext);
}
