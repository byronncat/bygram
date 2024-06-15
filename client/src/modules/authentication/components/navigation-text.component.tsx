import { Link } from 'react-router-dom';
import clsx from 'clsx';
import type { ReactProps } from '@global';

interface NavigationTextProps extends ReactProps {
  text: string;
  navigateText: string;
  path: string;
}

const NavigationText = ({ text, navigateText, path }: NavigationTextProps) => {
  return (
    <p className={clsx('w-full', 'text-center text-sm')}>
      {`${text} `}
      <Link
        to={path}
        className={clsx(
          'font-semibold capitalize',
          'duration-200',
          'text-primary dark:text-dark-primary',
          'hover:text-primary/[0.6] dark:hover:text-dark-primary/[0.6]',
        )}
      >
        {navigateText}
      </Link>
    </p>
  );
};

export default NavigationText;
