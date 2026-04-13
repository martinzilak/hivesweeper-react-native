import { FC, HTMLAttributes } from 'react';
import styles from './Styled.module.scss';
import classNames from 'classnames';

const StyledUl: FC<HTMLAttributes<HTMLUListElement>> = ({ children, className, ...restProps }) => (
  <ul className={classNames(className, styles.ul)} {...restProps}>
    {children}
  </ul>
);

export default StyledUl;
