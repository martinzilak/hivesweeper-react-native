import { FC, HTMLAttributes } from 'react';
import styles from './Styled.module.scss';
import classNames from 'classnames';

const StyledStrong: FC<HTMLAttributes<HTMLElement>> = ({ children, className, ...restProps }) => (
  <strong className={classNames(className, styles.strong)} {...restProps}>
    {children}
  </strong>
);

export default StyledStrong;
