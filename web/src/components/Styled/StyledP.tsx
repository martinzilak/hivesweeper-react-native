import { FC, HTMLAttributes } from 'react';
import styles from './Styled.module.scss';
import classNames from 'classnames';

const StyledP: FC<HTMLAttributes<HTMLParagraphElement>> = ({ children, className, ...restProps }) => (
  <p className={classNames(className, styles.p)} {...restProps}>
    {children}
  </p>
);

export default StyledP;
