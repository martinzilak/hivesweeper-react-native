import { FC } from 'react';
import styles from './Footer.module.scss';
import classNames from 'classnames';

const Footer: FC = () => {
  return (
    <div className={styles.footer}>
      <div className={classNames(styles.footerItem, styles.createdBy)}>
        <span>Created by</span>
        <span>Martin Zilak</span>
      </div>

      <div className={classNames(styles.footerItem, styles.contactMe)}>
        <a href="mailto:martin@zilak.sk?subject=Hivesweeper" className={styles.mailLink}>
          Contact me
        </a>
        <span>via e-mail</span>
      </div>

      <div className={classNames(styles.footerItem, styles.downloadAt)}>
        <a href="https://apps.apple.com/us/app/hivesweeper/id1581731994" className={styles.downloadButton}></a>
      </div>
    </div>
  );
};

export default Footer;
