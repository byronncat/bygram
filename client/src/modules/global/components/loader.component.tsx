import clsx from 'clsx';
import styles from '../styles/components/loader.module.sass';

export default function Loader() {
  return (
    <div
      className={clsx(
        'flex flex-col justify-center items-center',
        'w-full h-full',
      )}
    >
      <div>
        <div
          className={clsx(
            styles['configure-border-1'],
            'w-28 h-28 p-0.5 bg-white',
            'absolute flex justify-center items-center',
          )}
        >
          <span
            className={clsx(
              styles['configure-core'],
              'w-full h-full bg-dark-mode-background',
            )}
          />
        </div>
        <div
          className={clsx(
            styles['configure-border-2'],
            'w-28 h-28 p-0.5 bg-white rotate-45',
            'flex justify-center items-center',
          )}
        >
          <span
            className={clsx(
              styles['configure-core'],
              'w-full h-full bg-dark-mode-background',
            )}
          />
        </div>
      </div>
      <div
        className={clsx(
          'text-2xl font-bold tracking-widest',
          'px-4 py-1 mt-12 rounded',
          'bg-cerise-700 shadow-lg shadow-cerise-700/50',
          styles.waviy,
        )}
      >
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </div>
    </div>
  );
}
