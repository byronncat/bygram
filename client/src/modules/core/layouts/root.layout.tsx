import { Outlet, Navigate } from 'react-router-dom';
import { useStorageContext } from '@global';
import Sidebar from '../components/sidebar.component';
import clsx from 'clsx';

function RootLayout() {
  // * /images/wallpaper.jpg different from images/wallpaper.jpg
  const { authenticationStorage } = useStorageContext();
  return authenticationStorage.isAuthenticated ? (
    <>
      <main style={{ background: '#0f172a' }} className={clsx('w-100 h-100', 'position-relative')}>
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
