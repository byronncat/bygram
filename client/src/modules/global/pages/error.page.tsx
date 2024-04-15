import { Link } from 'react-router-dom'
import styles from '../styles/pages/error.module.sass'
import effects from '../../sass/effects.module.sass'
import clsx from 'clsx'

export function ErrorPage() {
  return (
    <div className={clsx(styles.wrapper, 'w-100 h-100', 'd-flex')}>
      <div className={styles.square404} id="Square">
        <span className={clsx(styles.square, effects['flicker-1'])}>
          <p>404</p>
        </span>
      </div>

      <div
        className={clsx(
          styles.texts,
          'd-flex flex-column justify-content-center'
        )}
      >
        <h4 className="fs-4">Oops! Page not found.</h4>
        <p className="pt-3 pb-5">
          The page you are looking for does not exist. Go back to the main page.
        </p>
        <Link to="/" className={clsx(styles.button, 'align-self-center')}>
          Back to Home
        </Link>
      </div>
    </div>
  )
}
