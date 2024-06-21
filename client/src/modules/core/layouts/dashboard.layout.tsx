import clsx from 'clsx';
import { Sidebar } from '../components';
import type { ReactProps } from '@global';

const ColumnLayout = ({ children }: ReactProps) => {
  // * /images/wallpaper.jpg different from images/wallpaper.jpg
  return (
    <div className={clsx('w-full h-full', 'flex')}>
      <Sidebar />

      <main
        className={clsx(
          'h-full grow',
          'flex flex-col justify-center items-center',
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default ColumnLayout;
