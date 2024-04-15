import { MouseEventHandler } from 'react'
import clsx from 'clsx'

import { ReactProps } from '../types'
import styles from '../styles/components/overlay.module.sass'

interface OverlayProps extends ReactProps {
  readonly exitHandler: MouseEventHandler
}
export default function Overlay({
  children,
  exitHandler,
  zIndex = 1,
}: OverlayProps) {
  return (
    <div
      className={clsx(
        `position-absolute top-0 start-0 z-${zIndex}`,
        'w-100 h-100',
        'd-flex justify-content-center align-items-center'
      )}
    >
      <span className={clsx(styles.overlay, 'z-n1')} onClick={exitHandler} />
      <button
        type="button"
        className={clsx(
          styles.button,
          'shadow-none',
          'btn-close btn-close-white',
          'position-absolute top-0 end-0',
          'p-3'
        )}
        aria-label="close"
        onClick={exitHandler}
      />
      {children}
    </div>
  )
}
