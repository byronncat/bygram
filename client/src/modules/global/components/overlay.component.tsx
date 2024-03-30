import clsx from 'clsx';
import { ReactProps } from '@global';
import styles from '../styles/components/overlay.module.sass';

function Overlay({ children, onExit, zIndex = 1 }: ReactProps) {
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
