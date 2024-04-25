import { Outlet, Navigate } from 'react-router-dom'
import { useAuthenticationContext } from '@authentication'
import Sidebar from '../components/sidebar.component'
import clsx from 'clsx'

function RootLayout() {
  // * /images/wallpaper.jpg different from images/wallpaper.jpg
  const { authenticationToken: authenticationStorage } =
    useAuthenticationContext()
  return authenticationStorage.isAuthenticated ? (
    <>
      <main
        style={{ background: '#1E0D37' }}
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
  )
}

export default RootLayout
