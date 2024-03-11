import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar, useAuth } from '@components';
import clsx from 'clsx';
import { useEffect } from 'react';

function RootLayout() {
  const { authentication } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!authentication.isAuthenticated) {
      navigate('/login');
    }
  }, [authentication, navigate]);

  return (
    <>
      <main
        style={{ background: 'url(imgs/wallpaper.jpg) center center / cover' }}
        className={clsx('w-100 h-100 m-0 p-0', 'position-relative')}
      >
        <Sidebar />
        <section
          className={clsx('w-auto h-100', '', 'd-flex justify-content-center', 'overflow-y-scroll')}
        >
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default RootLayout;
