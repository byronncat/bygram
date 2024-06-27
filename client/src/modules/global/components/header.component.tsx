import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { ThemeSelection } from './';
import logoURL from '@assets/images/logo.svg';

const Header = () => {
  return (
    <header
      className={clsx(
        'absolute top-0',
        'flex justify-between items-center',
        'w-full h-14 p-6',
        'bg-surface/[.87] dark:bg-dark-on-surface/[.07]',
        'shadow-md dark:shadow-none',
        'dark:border-b dark:border-white/[.1]',
      )}
    >
      <Brand />
      <ThemeSelection />
    </header>
  );
};

const Brand = () => {
  return (
    <Link to="/" className={clsx('flex items-center gap-x-2', 'w-fit')}>
      <img src={logoURL} className={clsx('w-9 h-9')} alt="logo" />
      <span
        className={clsx(
          'font-bold text-2xl text-primary dark:text-dark-primary',
        )}
      >
        bygram
      </span>
    </Link>
  );
};

export default Header;
