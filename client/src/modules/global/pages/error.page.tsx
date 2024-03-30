import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from '../styles/pages/error.module.sass';

function ErrorPage() {
  return (
    <div
      className={clsx(
        'w-100 h-100',
        'bg-dark',
        'd-flex justify-content-center align-items-center flex-column'
      )}
      style={{ background: 'url(/imgs/night-neon.jpg) center center / cover' }}
    >
      {/* <div className="glitch-1-movement">
        <h2 className="glitch-1-content glitch-1-layers glitch-1-font" data-text="ERROR">
          <span>ERROR</span>
        </h2>
      </div> */}

      <div className={clsx(styles.error, 'mb-5')}>
        <span className={styles['red-text']}>404</span>
        <br />
        <span className={styles['white-text']}>Error</span>
      </div>

      <Link to="/" className={clsx(styles.button, 'fs-1', 'px-3')}>
        CLICK HERE TO HOME!
      </Link>
    </div>
  );
}

export default ErrorPage;
