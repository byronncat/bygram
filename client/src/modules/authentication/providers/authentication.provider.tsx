import { useState, useContext, createContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJwt } from 'react-jwt';
import Cookies from 'js-cookie';
import { ROUTE } from '@route';

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
  const navigate = useNavigate();
  const { decodedToken } = useJwt<UserToken>(userCookie || '');
  const [user, setUser] = useState<UserToken | null>(decodedToken);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setUser(decodedToken);
    setIsLoggedIn(true);
    navigate(ROUTE.HOME);
  }, [decodedToken, navigate]);
  const logout = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
    navigate(ROUTE.LOGIN);
  }, [decodedToken, navigate]);

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
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
