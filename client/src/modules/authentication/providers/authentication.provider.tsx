import { useState, useContext, createContext, useEffect } from 'react';

import { ReactProps } from '@global';
import { authenticateAPI } from '../api';
const AuthenticationContext = createContext(
  {} as {
    isAuthenticated: boolean;
    setAuthenticatedState: React.Dispatch<React.SetStateAction<boolean>>;
  },
);

export default function AuthenticationProvider({ children }: ReactProps) {
  const [isAuthenticated, setAuthenticatedState] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await authenticateAPI();
      if (isAuthenticated !== response.success)
        setAuthenticatedState(response.success);
    })();
  }, [isAuthenticated]);

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        setAuthenticatedState,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthenticationContext() {
  return useContext(AuthenticationContext);
}
