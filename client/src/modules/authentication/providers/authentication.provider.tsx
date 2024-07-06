import {
  useState,
  useContext,
  createContext,
  useEffect,
  useLayoutEffect,
} from 'react';
import { useJwt } from 'react-jwt';
import { useToggle } from 'usehooks-ts';
import Cookies from 'js-cookie';

import { LoadingPage } from '@global';
import { authenticationApi } from '../api';
import type { User, ReactProps } from '@global';

const AuthenticationContext = createContext(
  {} as {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
    user: UserToken | null;
  },
);

interface UserToken extends Omit<User, 'password'> {
  iat: number;
}

const Authentication = ({ children }: ReactProps) => {
  const userCookie = Cookies.get('user');
  const { decodedToken } = useJwt<UserToken>(userCookie || '');
  const [user, setUser] = useState<UserToken | null>(decodedToken);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, toggleLoading] = useToggle(true);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  useLayoutEffect(() => {
    if (decodedToken) setUser(decodedToken);
  }, [decodedToken]);

  useEffect(() => {
    (async function authenticate() {
      const response = await authenticationApi.authenticate();
      if (!!userCookie) setIsLoggedIn(response.success);
      toggleLoading();
    })();
  }, [userCookie]);

  if (loading) return <LoadingPage />;
  return (
    <AuthenticationContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        user,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

const useAuthenticationContext = () => {
  return useContext(AuthenticationContext);
};

export default Authentication;
export { useAuthenticationContext };
