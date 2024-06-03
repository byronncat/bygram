import { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { XIcon } from '@assets/icons';
import type { MouseEvent } from 'react';
import type { ReactProps } from '../types';

interface OverlayProps extends ReactProps {
  readonly exitHandler: MouseEventHandler;
}
export default function Overlay({
  children,
  exitHandler,
  zIndex = 1,
}: OverlayProps) {
  function overlayHandler(e: MouseEvent) {
    if (e.target === e.currentTarget) exitHandler(e);
  }

  return (
    <div
      className={clsx(
        `absolute top-0 start-0 z-${zIndex}0`,
        'w-full h-screen bg-black/50',
        'flex content-center items-center',
      )}
      onClick={overlayHandler}
    >
      <button
        className={clsx('absolute top-0 right-0', 'p-3')}
        aria-label="close"
        onClick={exitHandler}
      >
        <XIcon className="w-6 h-6 fill-white/[0.7]" />
      </button>
      {children}
    </div>
  );
}
