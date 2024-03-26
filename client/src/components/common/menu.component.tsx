import clsx from 'clsx';
import { MenuItem, ReactProps } from '@types';
import styles from '@styles/component/menu.module.sass';

interface MenuProps extends ReactProps {
  list: MenuItem[];
}
function Menu({ list }: MenuProps) {
  return (
    <ul className={clsx(styles.menu, 'text-neon-glowing-2', 'list-group z-3')}>
      {list.map((item, index: any) => {
        return (
          <li
            key={index}
            aria-current="true"
            className={clsx(styles['menu-item'], 'list-group-item text-center')}
            onClick={() => {
              item.functionHandler();
            }}
          >
            {item.name}
          </li>
        );
      })}
    </ul>
  );
}

export default Menu;
