import { HeaderMenu } from 'src/components/HeaderMenu/HeaderMenu';
// import { Logo } from 'src/UI/Logo/Logo';
import TwitterIcon from '@mui/icons-material/Twitter';

import styles from 'src/styles/Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.Header__row}>
      <TwitterIcon
        color="primary"
        fontSize="large"
      />
      <HeaderMenu />
    </div>
  );
};
