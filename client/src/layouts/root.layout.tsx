import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar, useAuth } from '@components';
import clsx from 'clsx';

function RootLayout() {
  const { authentication } = useAuth();

  return authentication.isAuthenticated ? (
    <>
      <main
        style={{ background: 'url(imgs/wallpaper.jpg) center center / cover' }}
        className={clsx('w-100 h-100', 'position-relative')}
      >
        <Sidebar />
        <section
          className={clsx(
            'float-right h-100',
            'd-flex flex-column align-items-center',
            'overflow-y-scroll'
          )}
        >
          <Outlet />
        </section>
      </main>
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default RootLayout;
