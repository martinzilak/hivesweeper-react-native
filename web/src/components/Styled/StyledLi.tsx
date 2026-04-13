import { FC, HTMLAttributes } from 'react';
import styles from './Styled.module.scss';
import classNames from 'classnames';

const StyledLi: FC<HTMLAttributes<HTMLLIElement>> = ({ children, className, ...restProps }) => (
  <li className={classNames(className, styles.li)} {...restProps}>
    {children}
  </li>
);

export default StyledLi;
