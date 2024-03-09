import { createContext, useContext, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import clsx from 'clsx';
import { useAuth } from '@components';
import styles from '@sass/authLayout.module.sass';

const AuthLayoutContext = createContext({} as any);
const useAuthLayoutContext = () => useContext(AuthLayoutContext);

function AuthLayout() {
  const [className] = useState({
    leftSide: '',
    rightSide: styles['form-side'] as string,
    form: '',
    formField: {
      field: clsx(styles['form-field'], 'form-field form-floating'),
      input: clsx(styles['form-input'], 'form-control'),
      label: clsx(styles['form-label']),
      errorMessage: clsx(styles['error-message'], 'mt-1'),
    },
    logo: styles.logo as string,
  });

  const { authentication } = useAuth();
  const [title, setTitle] = useState('');

  return authentication.isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <AuthLayoutContext.Provider value={{ className }}>
      <div className={clsx('w-100 h-100', 'd-flex')}>
        <div className={clsx('col-md-6', 'd-none d-md-block', 'overflow-hidden')}>
          <img src="imgs/auth.gif" className="h-100" alt="auth" />
        </div>

        <div
          className={clsx(
            className.rightSide,
            'col-12 col-md-6',
            'd-flex flex-column justify-content-center align-items-center'
          )}
        >
          <span>
            <img className={clsx(className.logo, 'mb-2')} src="imgs/logo.svg" alt="logo" />
          </span>
          <h2 className={clsx('mb-3', 'fs-1 fw-bolder text-light text-capitalize')}>{title}</h2>
          <Outlet context={{ setTitle }} />
        </div>
      </div>
    </AuthLayoutContext.Provider>
  );
}

export { useAuthLayoutContext };
export default AuthLayout;
