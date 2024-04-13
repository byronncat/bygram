import { useState, useContext, createContext } from 'react';
import { AuthenticationStorage, ReactProps } from '../types';

const StorageContext = createContext(
  {} as {
    authenticationStorage: AuthenticationStorage;
    setAuthenticationStorage: (data: AuthenticationStorage) => void;
  }
);

export default function Storage({ children }: ReactProps) {
  const [authenticationStorage, setAuthenticationState] = useState<AuthenticationStorage>({
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' ? true : false,
  });

  function setAuthenticationStorage({ user, isAuthenticated }: AuthenticationStorage) {
    const authentication: AuthenticationStorage = {
      user: user,
      isAuthenticated: isAuthenticated,
    };

    setAuthenticationState(authentication);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }

  return (
    <StorageContext.Provider
      value={{
        authenticationStorage,
        setAuthenticationStorage,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}

export function useStorageContext() {
  return useContext(StorageContext);
}
