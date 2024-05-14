import clsx from 'clsx';
import effects from '@sass/effects.module.sass';
import logoURL from '@assets/images/logo.svg';

export default function Brand() {
  return (
    <>
      <img
        className="block"
        width={60}
        height={60}
        src={`${logoURL}`}
        alt="logo"
      />
      <h1
        className={clsx(
          effects['text-neon-glowing-1'],
          'mt-2 mb-6',
          'font-monoton text-3xl tracking-widest',
          '-skew-y-6',
        )}
      >
        bygram
      </h1>
    </>
  );
}
