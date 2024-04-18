import clsx from 'clsx'

import styles from '../../styles/layouts/auth.module.sass'
import effects from '@sass/effects.module.sass'
import logoURL from '@assets/images/logo.svg'

export default function Brand() {
  return (
    <>
      <img
        className={clsx('d-block')}
        width={60}
        height={60}
        src={`${logoURL}`}
        alt="logo"
      />
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
  )
}
