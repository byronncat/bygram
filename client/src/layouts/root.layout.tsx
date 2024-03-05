import { Navigate, Outlet } from 'react-router-dom';
import { Sidebar, useAuth } from '@components';
import clsx from 'clsx';

function RootLayout() {
  const { authentication } = useAuth();

  return authentication.isAuthenticated ? (
    <>
      <main
        style={{ background: 'url(imgs/wallpaper.jpg) center center / cover' }}
        className={clsx('w-100 h-100 m-0 p-0', 'position-relative')}
      >
        <Sidebar />
        <section className={clsx('w-auto h-100', 'overflow-auto', 'd-flex justify-content-center')}>
          <Outlet />
        </section>
      </main>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default RootLayout;
