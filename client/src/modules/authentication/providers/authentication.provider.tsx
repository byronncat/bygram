import { useState, useContext, createContext } from 'react';
// import axios from 'axios';

import { ReactProps } from '@global';
import { SessionId } from '../types';

const AuthenticationContext = createContext(
  {} as {
    session: {
      get: () => SessionId | null;
      set: (token: SessionId) => void;
    };
  },
);

// TODO: Add classes and divide the context into two separate contexts
interface AuthenticationContextProps extends ReactProps {
  initSession?: SessionId;
}
export default function AuthenticationProvider({
  children,
  initSession,
}: AuthenticationContextProps) {
  const [sessionToken, _setToken] = useState(
    localStorage.getItem('session_id' || initSession),
  );

  const session = {
    get: () => sessionToken,
    set: (token: SessionId) => {
      _setToken(token);
      localStorage.setItem('session_id', token);
    },
    session: sessionToken,
  };

  // useEffect(() => {
  //   if (token) {
  //     // axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  //     // localStorage.setItem('token', token)
  //   } else {
  //     // delete axios.defaults.headers.common['Authorization']
  //     // localStorage.removeItem('token')
  //   }
  // }, [token])

  return (
    <AuthenticationContext.Provider
      value={{
        session,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthenticationContext() {
  return useContext(AuthenticationContext);
}
