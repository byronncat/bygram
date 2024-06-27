import clsx from 'clsx';
import { Header } from '@global';
import { Sidebar } from '../components';
import type { ReactProps } from '@global';

const ColumnLayout = ({ children }: ReactProps) => {
  // * /images/wallpaper.jpg different from images/wallpaper.jpg
  return (
    <div className={clsx('w-full h-full pt-14', 'flex')}>
      <Header />
      <Sidebar />
      <main
        className={clsx(
          'h-full w-full',
          'flex justify-center grow',
          'overflow-y-auto',
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default ColumnLayout;
