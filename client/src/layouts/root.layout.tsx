import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from '@components';
import { useStorageContext } from '@contexts';
import clsx from 'clsx';

function RootLayout() {
  // * /imgs/wallpaper.jpg different from imgs/wallpaper.jpg
  const backgroundImageURL = '/imgs/wallpaper.jpg';
  const { authenticationStorage } = useStorageContext();
  return authenticationStorage.isAuthenticated ? (
    <>
      <main
        style={{ background: `url(${backgroundImageURL}) center center / cover` }}
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
