import { createContext, useContext, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import clsx from 'clsx';
import { Arrow } from '@components';
import { useStorageContext } from '@contexts';
import { Direction, ReactProps } from '@types';
import styles from '@styles/layout/auth.module.sass';
import effects from '@styles/effects.module.sass';

const AuthLayoutContext = createContext({} as { className: Record<string, string> });
const useAuthLayoutContext = () => useContext(AuthLayoutContext);

const className = {
  formField: clsx(styles['form-field'], 'form-field form-floating'),
  formInput: clsx(styles['form-input'], 'form-control'),
  formLabel: clsx(styles['form-label']),
  formErrorMessage: clsx(styles['error-message'], 'mt-1'),
  formErrorMessageAnimation: clsx(effects['flicker-one']),
};

function AuthLayout() {
  const backgroundImageURL = '/imgs/night-neon.jpg';
  const { authenticationStorage } = useStorageContext();
  const [title, setTitle] = useState('');
  const [side, setSide] = useState<Direction>('right');
  /* eslint-disable */
  function toggleSideHandler(event: React.MouseEvent) {
    setSide(side === 'left' ? 'right' : 'left');
    event.preventDefault();
  }

  return authenticationStorage.isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <AuthLayoutContext.Provider value={{ className }}>
      <div className={clsx('w-100 h-100', 'overflow-hidden user-select-none', 'position-relative')}>
        <span
          className={clsx('w-100 h-100', 'position-absolute z-n1')}
          style={{
            backgroundImage: `url(${backgroundImageURL})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
          }}
        />
        <div
          className={clsx(
            styles['form-side'],
            'position-absolute top-0 bottom-0',
            'col-12 col-lg-6 h-100',
            'd-flex flex-column justify-content-center align-items-center',
            side === 'right' && styles['move-to-right']
          )}
        >
          <Title data={title} />
          {/* <SwitchSideButton onClick={toggleSideHandler} direction={side} /> */}
          <PanelBackground />
          <Brand />
          <Outlet context={{ setTitle }} />
        </div>
      </div>
    </AuthLayoutContext.Provider>
  );
}

function Title({ data }: { data: string }) {
  return (
    <span
      className={clsx(
        styles.title,
        effects['text-neon-glowing-2'],
        'm-2',
        'text-capitalize',
        'position-absolute start-0 top-0'
      )}
    >
      {data}
    </span>
  );
}

interface SwitchSideButtonProps extends ReactProps {
  direction: Direction;
}

function SwitchSideButton({ onClick, direction }: SwitchSideButtonProps) {
  return (
    <Arrow
      className={clsx(
        styles.title,
        styles['responsive-arrow'],
        'text-neon-glowing-2',
        'm-2',
        'position-absolute end-0 top-0'
      )}
      direction={direction}
      onClick={onClick}
      number={2}
    />
  );
}
/* eslint-enable */

function PanelBackground() {
  return (
    <span className={clsx(styles['panel-bg'], 'w-100 h-100', 'position-absolute start-0 top-0')} />
  );
}

function Brand() {
  const logoURL = '/imgs/logo.svg';
  return (
    <>
      <img className={clsx(styles.logo)} src={`${logoURL}`} alt="logo" />
      <h1
        className={clsx(
          styles['brand-name'],
          effects['text-neon-glowing-1'],
          'text-uppercase fs-2',
          'mt-2 my-3'
        )}
      >
        bygram
      </h1>
    </>
  );
}

export { useAuthLayoutContext };
export default AuthLayout;
