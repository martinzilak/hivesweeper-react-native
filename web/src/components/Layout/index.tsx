import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';
import Header from '../Header';
import Footer from '../Footer';

const Layout: FC = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Header />
      </div>

      <div className={styles.content}>
        <Outlet />
      </div>

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
