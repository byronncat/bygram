import clsx from 'clsx';
import styles from '../styles/auth.module.sass';
import effects from '@sass/effects.module.sass';
import logoURL from '@assets/imgs/logo.svg';

export default function Brand() {
  return (
    <>
      <img className={clsx(styles.logo)} width={60} height={60} src={`${logoURL}`} alt="logo" />
      <h1
        className={clsx(
          styles['brand-name'],
          effects['text-neon-glowing-1'],
          'text-uppercase fs-2',
          'mt-2 my-3'
        )}
      >
        bygram
      </h1>
    </>
  );
}
