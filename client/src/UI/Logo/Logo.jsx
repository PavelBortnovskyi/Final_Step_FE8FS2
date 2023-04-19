import { Link } from 'react-router-dom';
import styles from 'src/styles/Logo.module.scss';

export const Logo = () => {
  return (
    <Link to="/" className={styles.LogoLink}>
      <img src="./img/logo/logo.png" alt="Logo" />
    </Link>
  );
};
