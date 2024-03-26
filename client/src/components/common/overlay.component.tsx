import clsx from 'clsx';
import styles from '@styles/component/overlay.module.sass';
import { ReactProps } from '@types';

interface OverlayProps extends ReactProps {
  zIndex?: number;
}
function Overlay({ children, onExit, zIndex = 1 }: OverlayProps) {
  return (
    <div
      data-bs-theme="dark"
      className={clsx(
        styles.wrapper,
        `position-absolute top-0 start-0 z-${zIndex}`,
        'w-100 h-100',
        'd-flex justify-content-center align-items-center'
      )}
    >
      <span className={styles.overlay} onClick={onExit} />
      <button
        type="button"
        className={clsx('shadow-none', 'btn-close', 'position-absolute top-0 end-0', 'p-4')}
        aria-label="Close"
        onClick={onExit}
      ></button>
      {children}
    </div>
  );
}

export default Overlay;
