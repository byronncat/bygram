import { useState, lazy, Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import clsx from 'clsx'

import { useStorageContext } from '@global'
import { ClassNameProvider } from '../providers'

import styles from '../styles/layouts/auth.module.sass'
import effects from '@sass/effects.module.sass'
import backgroundImageURL from '@assets/images/night-neon.avif'

export default function AuthenticationLayout() {
  const { authenticationToken } = useStorageContext()
  const [title, setTitle] = useState('')

  const LazyComponents = {
    Brand: lazy(() => import('./lazy-component/brand.component')),
  }

  if (authenticationToken.isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <ClassNameProvider>
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
            'w-100 h-100',
            'd-flex flex-column justify-content-center align-items-center'
          )}
        >
          <PanelBackground />
          <Title data={title} />
          <Suspense fallback={null}>
            <LazyComponents.Brand />
          </Suspense>
          <Outlet context={{ setTitle }} />
        </div>
      </div>
    </ClassNameProvider>
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
