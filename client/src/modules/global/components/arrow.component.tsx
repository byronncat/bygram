import { Direction, ReactProps } from '../types';
import styles from '../styles/components/arrow.module.sass';
import clsx from 'clsx';

interface ArrowProps extends ReactProps {
  direction: Direction;
  number?: number;
}

export default function Arrow({ className, direction, onClick, number = 1 }: ArrowProps) {
  return (
    <div className={clsx(styles.wrapper, className)} onClick={onClick}>
      {[...Array(number)].map((x, index) => (
        <i className={clsx(styles.arrow, `fa-solid fa-angles-${direction}`)} key={index} />
      ))}
    </div>
  );
}
