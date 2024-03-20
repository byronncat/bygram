import clsx from 'clsx';
import styles from '@styles/component/menu.module.sass';

function Menu({ list }: { list: any }) {
  return (
    <ul className={clsx(styles.menu, 'text-neon-glowing-2', 'list-group')}>
      {list.map((item: { name: string; function: Function }, index: any) => {
        return (
          <li
            key={index}
            aria-current="true"
            className={clsx(styles['menu-item'], 'list-group-item text-center')}
            onClick={() => {
              item.function();
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
