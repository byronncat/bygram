import { Navigate, Outlet } from 'react-router-dom';
import { Sidebar, useAuth } from '@components';
import clsx from 'clsx';

function RootLayout() {
  const { authentication } = useAuth();

  return authentication.isAuthenticated ? (
    <>
      <main
        style={{ background: 'url(imgs/wallpaper.png) center center / cover' }}
        className={clsx('row w-100 h-100 m-0 p-0', 'd-flex flex-column flex-shrink-0')}
      >
        <Sidebar />
        <div className="col-4 h-100 p-0"></div>
        <div className={clsx('col-8 h-100', 'overflow-auto')}>
          <Outlet />
        </div>
      </main>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default RootLayout;
