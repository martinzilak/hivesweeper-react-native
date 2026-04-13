import { AnchorHTMLAttributes, FC } from 'react';
import styles from './Styled.module.scss';
import classNames from 'classnames';

const StyledA: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ children, className, ...restProps }) => (
  <a className={classNames(className, styles.a)} {...restProps}>
    {children}
  </a>
);

export default StyledA;
