import { NavLink } from 'react-router-dom';

import styles from 'src/styles/HeaderMenu.module.scss';

export const HeaderMenu = () => {
  return (
    <nav className={styles.HeaderMenu}>
      <ul className={styles.HeaderMenu__list}>
        <li className={styles.HeaderMenu__item}>
          <NavLink to="/">Home</NavLink>
        </li>
        <li className={styles.HeaderMenu__item}>
          <NavLink to="/user">User</NavLink>
        </li>
        <li className={styles.HeaderMenu__item}>
          <NavLink to="/news">News</NavLink>
        </li>
      </ul>
    </nav>
  );
};
