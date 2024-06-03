import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { ReactProps } from '@global';

interface NavigationTextProps extends ReactProps {
  text: string;
  navigateText: string;
  path: string;
}

export default function NavigationText({
  text,
  navigateText,
  path,
}: NavigationTextProps) {
  return (
    <p className={clsx('w-full', 'text-center text-sm')}>
      {`${text} `}
      <Link
        to={path}
        className={clsx(
          'font-semibold capitalize',
          'duration-200',
          'hover:text-white/[.62]',
        )}
      >
        {navigateText}
      </Link>
    </p>
  );
}
