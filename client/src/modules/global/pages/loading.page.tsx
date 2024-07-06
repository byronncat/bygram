import clsx from 'clsx';
import { Loader } from '../components';
import logoURL from '@assets/images/logo.svg';

const Loading = () => {
  return (
    <div className={clsx('h-full', 'relative', 'flex justify-center')}>
      <Loader.BoxSpin />
      <div
        className={clsx(
          'flex flex-col items-center',
          'absolute bottom-6 left-1/2 transform -translate-x-1/2',
        )}
      >
        <span className="text-on-background/[0.6] dark:text-dark-on-background/[0.6]">
          from
        </span>
        <div className="flex items-center">
          <img className="block mr-2 w-8 h-8" src={`${logoURL}`} alt="logo" />
          <span
            className={clsx(
              'font-semibold text-xl',
              'text-on-background/[0.87] dark:text-dark-on-background/[0.87]',
            )}
          >
            Bygram
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
