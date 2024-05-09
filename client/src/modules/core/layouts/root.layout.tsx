import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar.component';
import clsx from 'clsx';

function RootLayout() {
  // * /images/wallpaper.jpg different from images/wallpaper.jpg
  return (
    <>
      <main
        style={{ background: '#1E0D37' }}
        className={clsx('w-100 h-100', 'position-relative')}
      >
        {/* <Sidebar /> */}
        <section
          className={clsx(
            'float-right h-100',
            'd-flex flex-column align-items-center',
            'overflow-y-scroll',
          )}
        >
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default RootLayout;
