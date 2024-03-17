import { createContext, useContext, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import clsx from 'clsx';
import { useAuth } from '@components';
import styles from '@sass/layout/auth.module.sass';

const AuthLayoutContext = createContext({} as any);
const useAuthLayoutContext = () => useContext(AuthLayoutContext);

function AuthLayout() {
  const className = {
    formField: {
      field: clsx(styles['form-field'], 'form-field form-floating'),
      input: clsx(styles['form-input'], 'form-control'),
      label: clsx(styles['form-label']),
      errorMessage: clsx(styles['error-message'], 'mt-1'),
    },
  };
  const { authentication } = useAuth();
  const [title, setTitle] = useState('');

  return authentication.isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <AuthLayoutContext.Provider value={{ className }}>
      <div
        className={clsx(
          'w-100 h-100',
          'd-flex flex-row-reverse',
          'overflow-hidden user-select-none',
          'position-relative'
        )}
      >
        <span
          className={clsx('w-100 h-100', 'position-absolute z-n1')}
          style={{
            backgroundImage: 'url(imgs/night-neon.jpg)',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
          }}
        />
        <div
          className={clsx(
            styles['form-side'],
            'position-relative',
            'col-12 col-lg-6 h-100',
            'd-flex flex-column justify-content-center align-items-center'
          )}
        >
          <span
            className={clsx(styles['panel-bg'], 'w-100 h-100', 'position-absolute start-0 top-0')}
          />
          <img className={clsx(styles.logo)} src="imgs/logo.svg" alt="logo" />
          <h1
            className={clsx(
              styles['brand-name'],
              'text-neon-glowing-1',
              'text-uppercase fs-1',
              'mt-2 my-4'
            )}
          >
            bygram
          </h1>
          <span
            className={clsx(
              styles.title,
              'text-neon-glowing-2',
              'm-2',
              'text-capitalize',
              'position-absolute start-0 top-0'
            )}
          >
            {title}
          </span>
          <Outlet context={{ setTitle }} />
        </div>
      </div>
    </AuthLayoutContext.Provider>
  );
}

export { useAuthLayoutContext };
export default AuthLayout;
