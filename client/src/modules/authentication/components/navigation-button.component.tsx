import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { ReactProps } from '@global';

interface NavigationButtonProps extends ReactProps {
  text: string;
  path: string;
}

export default function NavigationButton({
  text,
  path,
}: NavigationButtonProps) {
  return (
    <Link
      to={path}
      className={clsx(
        'block font-medium text-center capitalize',
        'duration-300 hover:text-slate-300',
      )}
    >
      {text}
    </Link>
  );
}
