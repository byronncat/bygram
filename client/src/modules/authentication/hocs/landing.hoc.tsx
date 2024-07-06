import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ClassNameProvider, useAuthenticationContext } from '../providers';
import { LandingPageLayout } from '../layouts';
import { ErrorPage, LoadingPage } from '@/modules/global';

type OutletContextProps = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

const Landing = () => {
  const [title, setTitle] = useState('');
  const { isLoggedIn } = useAuthenticationContext();
  if (isLoggedIn) return <LoadingPage />;

  return (
    <ClassNameProvider>
      <LandingPageLayout title={title}>
        <Outlet context={{ setTitle }} />
      </LandingPageLayout>
    </ClassNameProvider>
  );
};

export default Landing;
export type { OutletContextProps };
