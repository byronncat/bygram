import { useState, useContext, createContext, ReactNode } from 'react';
import { AuthenticationStorage } from '@types';

const AuthenticationContext = createContext(
  {} as {
    authentication: AuthenticationStorage;
    setAuthenticationStorage: (data: AuthenticationStorage) => void;
  }
);

export default function Authentication({ children }: { children: ReactNode }) {
  const [authentication, setAuthentication] = useState<AuthenticationStorage>({
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' ? true : false,
  });

  const setAuthenticationStorage = ({ user, isAuthenticated }: AuthenticationStorage) => {
    const authentication: AuthenticationStorage = {
      user: user,
      isAuthenticated: isAuthenticated,
    };

    setAuthentication(authentication);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  };

  return (
    <AuthenticationContext.Provider value={{ authentication, setAuthenticationStorage }}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthenticationContext);
}
