import { useLocation } from 'react-router-dom';

import { Sidebar } from 'src/components/Sidebar/Sidebar';
// import { Main } from 'src/components/Main/Main';
import { Footer } from 'src/components/Footer/Footer';

// import { Modal } from 'src/components/Modal/Modal';
import { BottomToolbar } from 'src/components/BottomToolbar/BottomToolbar';
import { MainRoutes } from 'src/routes/MainRoutes';
import { ModalRoutes } from 'src/routes/ModalRoutes';

import styles from 'src/styles/Layout.module.scss';
import body from 'src/styles/Body.module.scss';

export const Layout = () => {
  // create location for MainRoutes
  const location = useLocation();
  const background = location.state && location.state.background;

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
            {/* <Main /> */}

            {/* routes for main components */}
            <MainRoutes location={background || location} />
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

      {/* routes for modal window */}
      <ModalRoutes />
    </div>
  );
};
