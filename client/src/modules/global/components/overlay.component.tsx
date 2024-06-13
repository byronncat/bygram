import { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { XIcon } from '@assets/icons';
import type { MouseEvent } from 'react';
import type { ReactProps } from '../types';

interface OverlayProps extends ReactProps {
  readonly exitHandler: MouseEventHandler;
}
const Overlay = ({ children, exitHandler, zIndex = 1 }: OverlayProps) => {
  function overlayHandler(e: MouseEvent) {
    if (e.target === e.currentTarget) exitHandler(e);
  }

  return (
    <div
      className={clsx(
        `absolute top-0 start-0 z-${zIndex}0`,
        'w-screen h-screen bg-on-surface/[0.76]',
        'flex justify-center items-center',
      )}
      onClick={overlayHandler}
    >
      <button
        className={clsx('absolute top-0 right-0', 'p-3')}
        aria-label="close"
        onClick={exitHandler}
      >
        <XIcon className="w-6 h-6 fill-white/[0.92] hover:fill-white/[0.6] duration-300" />
      </button>
      {children}
    </div>
  );
};

export default Overlay;
