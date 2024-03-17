import styles from '@sass/component/loading.module.sass';
import clsx from 'clsx';

function Loading() {
  return (
    <div className={clsx(styles.wrapper, 'd-flex align-items-center', 'h-100')}>
      <p className={clsx(styles.loader, 'text-uppercase fs-1', 'text-neon-glowing-2')}>
        <span className={clsx(styles.spinner, 'spinner-border', 'me-3', 'fs-6')} role="status">
          <span className="visually-hidden">Loading...</span>
        </span>
        loading
      </p>
    </div>
  );
}

export default Loading;
