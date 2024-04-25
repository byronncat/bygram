import clsx from 'clsx'
import { ReactProps } from '@global'
import { Brand } from '../components'
import styles from '../styles/layouts/auth.module.sass'
import effects from '@sass/effects.module.sass'
import backgroundImageURL from '@assets/images/night-neon.avif'

interface AuthenticationLayoutProps extends ReactProps {
  title: string
}

export default function AuthenticationLayout({
  title,
  children,
}: AuthenticationLayoutProps) {
  return (
    <div
      className={clsx(
        'w-100 h-100',
        'overflow-hidden user-select-none',
        'position-relative'
      )}
    >
      <span
        className={clsx('w-100 h-100', 'd-block position-absolute z-n1')}
        style={{
          backgroundImage: `url(${backgroundImageURL})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
        }}
      />
      <div
        className={clsx(
          styles['form-side'],
          'text-white',
          'position-relative float-end',
          'h-100',
          'd-flex flex-column justify-content-center align-items-center'
        )}
      >
        <Brand />
        <PanelBackground />
        <Title data={title} />
        {children}
      </div>
    </div>
  )
}

function Title({ data }: { data: string }) {
  return (
    <span
      className={clsx(
        styles.title,
        effects['text-neon-glowing-2'],
        'm-2',
        'text-capitalize',
        'position-absolute start-0 top-0'
      )}
    >
      {data}
    </span>
  )
}

function PanelBackground() {
  return (
    <span
      className={clsx(
        styles['panel-bg'],
        'w-100 h-100',
        'position-absolute z-n1'
      )}
    />
  )
}
