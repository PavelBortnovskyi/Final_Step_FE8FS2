import { Header } from 'src/components/Header/Header';
import { Main } from 'src/components/Main/Main';
import { Footer } from 'src/components/Footer/Footer';
import styles from 'src/styles/Layout.module.scss';
import body from 'src/styles/Body.module.scss';
import { BottomToolbar } from 'src/components/BottomToolbar/BottomToolbar';
export const Layout = () => {
  return (
    <div className={body.allContainer}>
      <header className={styles.Header}>
        <div className={styles.container}>
          <Header />
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
      {/* Temp need for registration. PortnovDmytro. */}
      <BottomToolbar />
    </div>
  );
};
