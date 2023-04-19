import { Outlet } from 'react-router-dom';
import styles from 'src/styles/Main.module.scss';

export const Main = () => {
  return (
    <div className={styles.Main__row}>
      <Outlet />
    </div>
  );
};
