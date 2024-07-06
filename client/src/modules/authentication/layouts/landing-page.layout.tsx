import clsx from 'clsx';

import { Header } from '@global';
import backgroundImageURL from '@assets/images/night-neon.avif';
import effects from '@sass/effects.module.sass';
import { type ReactProps } from '@global';

interface LandingpageLayoutProps extends ReactProps {
  title: string;
}

const LandingPage = ({ title, children }: LandingpageLayoutProps) => {
  return (
    <div className={clsx('w-full h-full', 'overflow-hidden select-none')}>
      <SubBackground />
      <div
        className={clsx(
          'w-full lg:w-3/5 h-full',
          'relative z-0 float-right',
          'flex flex-col justify-center items-center',
        )}
      >
        <Header />
        <span
          className={clsx(
            'block mb-4',
            'font-bold text-2xl capitalize',
            'text-on-background/[0.87] dark:text-dark-on-background/[0.87]',
            'sm:text-3xl md:text-4xl',
          )}
        >
          {title}
        </span>
        {children}
      </div>
    </div>
  );
};

const SubBackground = () => {
  return (
    <div
      className={clsx('w-2/5 h-full float-left', 'hidden lg:block', 'relative')}
    >
      <div
        className={clsx(
          'bg-[linear-gradient(45deg,rgba(4,2,96,0.7),rgba(180,49,183,0.9)),linear-gradient(90deg,rgba(51,136,140,0.3),rgba(87,240,240,0.1))]',
          'w-full h-full',
          'flex flex-col justify-center items-center',
          'text-center text-white',
          'absolute top-0 left-0',
        )}
      >
        <div className="max-w-lg">
          <h1
            className={clsx(
              effects['text-neon-glowing-1'],
              'mb-3',
              'font-monoton text-3xl tracking-widest',
            )}
          >
            welcome back
          </h1>
          <span className="block">
            The ultimate platform designed to bring people together through the
            power of media.
          </span>
        </div>
      </div>
      <img
        src={backgroundImageURL}
        alt="background"
        className={clsx('w-full h-full', 'object-cover')}
      />
    </div>
  );
};

export default LandingPage;
