import { useState, lazy, Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import clsx from 'clsx';
import { Arrow, useStorageContext, ReactProps, Direction } from '@global';
import Auth from '../contexts/auth.context';
import styles from '../styles/auth.module.sass';
import effects from '@sass/effects.module.sass';
import backgroundImageURL from '@assets/imgs/night-neon.avif';

export default function AuthLayout() {
  const { authenticationStorage } = useStorageContext();
  const [title, setTitle] = useState('');
  const [side, setSide] = useState<Direction>('right');
  /* eslint-disable */
  function toggleSideHandler(event: React.MouseEvent) {
    setSide(side === 'left' ? 'right' : 'left');
    event.preventDefault();
  }

  const LazyComponents = {
    Brand: lazy(() => import('../components/brand.component')),
  };

  return authenticationStorage.isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <Auth>
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
          <Suspense fallback={null}>
            <LazyComponents.Brand />
          </Suspense>
          <Outlet context={{ setTitle }} />
        </div>
      </div>
    </Auth>
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
