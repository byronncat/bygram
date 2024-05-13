import { Link } from 'react-router-dom';
import clsx from 'clsx';

import styles from '../styles/pages/error.module.sass';

export function ErrorPage() {
  return (
    <div
      className={clsx(
        'h-screen bg-haiti-950',
        'flex flex-col md:flex-row',
        'overflow-hidden',
      )}
    >
      <div
        className={clsx(
          'w-full md:w-1/2 h-1/2 md:h-full',
          'flex place-content-center',
        )}
      >
        <span
          className={clsx(
            styles.square,
            'flicker-slightly',
            'w-36 md:w-1/2 w-36 md:h-full relative -rotate-24',
            'flex justify-center items-center',
            'after:content-[""] after:block after:w-full after:pb-full after:absolute after:rounded-2xl',
          )}
        >
          <p
            className={clsx(
              'relative z-10',
              'font-bold text-10vw text-haiti-950 drop-shadow-xl',
              'select-none',
            )}
          >
            404
          </p>
        </span>
      </div>

      <div
        className={clsx(
          'w-full md:w-1/2 p-8 md:p-4 relative z-20',
          'flex place-content-center flex-col',
        )}
      >
        <h4 className="font-semibold text-lg">Oops! Page not found.</h4>
        <p className="pt-3 pb-5">
          The page you are looking for does not exist. Go back to the main page.
        </p>
        <Link to="/" className={clsx('button', 'self-center md:self-start')}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
