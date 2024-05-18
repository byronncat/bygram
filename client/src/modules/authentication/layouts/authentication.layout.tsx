import clsx from 'clsx';
import { Brand } from '../components';

import styles from '../styles/layouts/authentication.module.sass';
import effects from '@sass/effects.module.sass';
import backgroundImageURL from '@assets/images/night-neon.avif';
import type { ReactProps } from '@global';

interface AuthenticationLayoutProps extends ReactProps {
  title: string;
}

export default function AuthenticationLayout({
  title,
  children,
}: AuthenticationLayoutProps) {
  return (
    <div
      className={clsx('w-full h-full relative', 'overflow-hidden select-none')}
    >
      <span
        className={clsx('w-full h-full block', 'absolute z-0')}
        style={{
          backgroundImage: `url(${backgroundImageURL})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
        }}
      />
      <div
        className={clsx(
          'text-white',
          'w-full md:w-1/2 h-full relative z-10',
          'flex flex-col justify-center items-center',
          'duration-500 ease-in-out',
        )}
      >
        <Brand />
        <PanelBackground />
        <Title data={title} />
        <Signboard data={'welcome back'} />
        {children}
      </div>
    </div>
  );
}

function Title({ data }: { data: string }) {
  return (
    <span
      className={clsx(
        effects['text-neon-glowing-2'],
        'px-4 py-2 m-2',
        'font-sacramento text-4xl text-capitalize capitalize',
        'absolute top-0 left-0',
      )}
    >
      {data}
    </span>
  );
}

function Signboard({ data }: { data: string }) {
  return (
    <span
      className={clsx(
        effects['text-neon-glowing-2'],
        'px-4 py-2 m-2 bg-slate-950/50 rounded-lg',
        'font-sacramento text-4xl text-center text-capitalize capitalize',
        'flex flex-col items-center justify-center',
        'absolute top-0 left-full',
      )}
    >
      {data}
    </span>
  );
}

function PanelBackground() {
  return (
    <span
      className={clsx(
        styles['panel-background'],
        'w-full h-full',
        'absolute top-0 -z-10',
      )}
    />
  );
}
