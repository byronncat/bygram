import clsx from 'clsx'
import styles from '../styles/components/loader.module.sass'

export default function Loader() {
  return (
    <div
      className={clsx(
        'd-flex flex-column justify-content-center align-items-center',
        'w-100 h-100'
      )}
    >
      <div className={styles['spinner-box']}>
        <div className={styles['configure-border-1']}>
          <span className={styles['configure-core']} />
        </div>
        <div className={styles['configure-border-2']}>
          <span className={styles['configure-core']} />
        </div>
      </div>
      <div className={clsx(styles.text, styles.waviy, 'mt-5')}>
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </div>
    </div>
  )
}
