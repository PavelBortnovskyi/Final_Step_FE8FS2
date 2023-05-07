import { Sidebar } from 'src/components/Sidebar/Sidebar';
import { Main } from 'src/components/Main/Main';
import { Footer } from 'src/components/Footer/Footer';

import { Modal } from 'src/components/Modal/Modal';
import { BottomToolbar } from 'src/components/BottomToolbar/BottomToolbar';

import styles from 'src/styles/Layout.module.scss';
import body from 'src/styles/Body.module.scss';

export const Layout = () => {
  return (
    <div className={body.allContainer}>
      <header className={styles.Header}>
        <div className={styles.container}>
          <Sidebar />
        </div>
      </header>
      <div className={styles.mainContainr}>
        <main className={styles.Main}>
          <div className={styles.container}>
            <Main />
          </div>
        </main>
        <footer className={styles.Footer}>
          <div className={styles.container}>
            <Footer />
          </div>
        </footer>
      </div>
      <div></div>
      <BottomToolbar />
    </div>
  );
};
