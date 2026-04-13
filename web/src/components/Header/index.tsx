import styles from './Header.module.scss';
import { FC, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SiteRoute } from '../../constants';
import classNames from 'classnames';

const Header: FC = () => {
  const { pathname } = useLocation();
  const [isFloatingMenuOpen, setIsFloatingMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsFloatingMenuOpen((isOpen) => !isOpen);
  };

  const menuItems = useMemo(
    () => (
      <>
        {Object.values(SiteRoute).map(({ fullPath, name, displayName }) => (
          <span
            key={name}
            className={classNames(styles.menuItem, { [styles.menuItemSelected]: fullPath === pathname })}
          >
            <Link to={fullPath} onClick={() => setIsFloatingMenuOpen(false)}>
              {displayName}
            </Link>
          </span>
        ))}
      </>
    ),
    [pathname],
  );

  return (
    <>
      <div className={styles.logo} />

      <div className={styles.hamburgerMenu} onClick={toggleMenu} />

      {isFloatingMenuOpen && <div className={styles.floatingMenu}>{menuItems}</div>}

      <div className={styles.menu}>{menuItems}</div>
    </>
  );
};

export default Header;
