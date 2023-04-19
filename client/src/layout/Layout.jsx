import { Header } from 'src/components/Header/Header';
import { Main } from 'src/components/Main/Main';
import { Footer } from 'src/components/Footer/Footer';
import styles from 'src/styles/Layout.module.scss';

export const Layout = () => {
  return (
    <>
      <header className={styles.Header}>
        <div className={styles.container}>
          <Header />
        </div>
      </header>
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
    </>
  );
};
