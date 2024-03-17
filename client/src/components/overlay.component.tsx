import clsx from 'clsx';
import styles from '@sass/component/overlay.module.sass';

function Overlay({
  children,
  closeFunction,
}: {
  children: React.ReactNode;
  closeFunction: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      data-bs-theme="dark"
      className={clsx(
        styles.wrapper,
        'position-absolute top-0 start-0 z-1',
        'w-100 h-100',
        'd-flex justify-content-center align-items-center'
      )}
    >
      <span
        className={styles.overlay}
        onClick={() => {
          closeFunction(false);
        }}
      />
      <button
        type="button"
        className={clsx('shadow-none', 'btn-close', 'position-absolute top-0 end-0', 'p-4')}
        aria-label="Close"
        onClick={() => closeFunction(false)}
      ></button>
      {children}
    </div>
  );
}

export default Overlay;
