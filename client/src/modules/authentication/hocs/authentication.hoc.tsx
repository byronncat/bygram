import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ClassNameProvider } from '../providers';
import { LandingPageLayout } from '../layouts';

type OutletContextProps = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

const Authentication = () => {
  const [title, setTitle] = useState('');

  return (
    <ClassNameProvider>
      <LandingPageLayout title={title}>
        <Outlet context={{ setTitle }} />
      </LandingPageLayout>
    </ClassNameProvider>
  );
};

export default Authentication;
export type { OutletContextProps };
