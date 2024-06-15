import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ClassNameProvider } from '../providers';
import { AuthenticationLayout } from '../layouts';

type OutletContextProps = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

const Authentication = () => {
  const [title, setTitle] = useState('');

  return (
    <ClassNameProvider>
      <AuthenticationLayout title={title}>
        <Outlet context={{ setTitle }} />
      </AuthenticationLayout>
    </ClassNameProvider>
  );
};

export default Authentication;
export type { OutletContextProps };
