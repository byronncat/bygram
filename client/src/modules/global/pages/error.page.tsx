import { Link } from 'react-router-dom';
import clsx from 'clsx';

const Error = () => {
  return (
    <div className={clsx('w-full h-full', 'flex justify-center items-center')}>
      <div className="flex flex-col items-center">
        <div
          className={clsx('text-center', 'w-full')}
          style={{
            background:
              'radial-gradient(50% 109137.91% at 50% 50%, rgba(176, 0, 32, 0.2) 0%, rgba(254, 244, 247, 0) 100%)',
          }}
        >
          <span
            className={clsx(
              'bg-background text-error font-bold text-3xl inline-block px-3',
              'dark:bg-dark-background dark:text-dark-error',
            )}
          >
            404
          </span>
        </div>
        <h1
          className={clsx(
            'mt-12 mb-10',
            'font-bold text-5xl',
            'text-on-background dark:text-dark-on-background',
          )}
        >
          Page Not Found
        </h1>
        <p
          className={clsx(
            'text-on-background/[0.6] dark:text-dark-on-background/[0.6]',
            'mb-10',
          )}
        >
          Looks like you've followed a broken link or entered a URL that doesn't
          exist on this site.
        </p>
        <div className="space-x-4">
          <Link to="/" className={clsx('px-12 py-3', 'simple-border-button')}>
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
