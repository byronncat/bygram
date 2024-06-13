import clsx from 'clsx';
import type { ReactProps } from '@global';
import Sidebar from '../components/sidebar.component';
import { SidebarOptionsProvider } from '../providers';

export default function ColumnLayout({ children }: ReactProps) {
  // * /images/wallpaper.jpg different from images/wallpaper.jpg
  return (
    <>
      <main className={clsx('w-full h-full', 'position-relative flex')}>
        <SidebarOptionsProvider>
          <Sidebar />
        </SidebarOptionsProvider>

        <div
          className={clsx(
            'h-full grow',
            'flex flex-col justify-center items-center',
          )}
        >
          {children}
        </div>
      </main>
    </>
  );
}
