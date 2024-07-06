import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LoadingPage } from '@global';
import { authenticationApi } from '../api';
import { AuthenticationProvider, useAuthenticationContext } from '../providers';

import type { ReactProps } from '@global';

const Authentication = ({ children }: ReactProps) => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuthenticationContext();

  useEffect(() => {
    (async function authenticate() {
      console.log('Authenticate');
      setLoading(true);
      const response = await authenticationApi.authenticate();
      if (response.success) login();
      setLoading(false);
      console.log('Authenticate Done');
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <LoadingPage />;
  return <>{children}</>;
};

const AuthenticationWrapper = () => {
  return (
    <AuthenticationProvider>
      <Authentication>
        <Outlet />
      </Authentication>
    </AuthenticationProvider>
  );
};

export default AuthenticationWrapper;
