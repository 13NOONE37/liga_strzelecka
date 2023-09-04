import React from 'react';
import cx from 'classnames';
import styles from './Table.module.css';

export default function Table({ children, className }) {
  return <div className={cx(styles.table, { className })}>{children}</div>;
}
function TableHeading({ children, className }) {
  return (
    <div className={cx(styles['table--nav'], { className })}>{children}</div>
  );
}
function TableContent({ children, className }) {
  return (
    <div className={cx(styles['table--results'], { className })}>
      {children}
    </div>
  );
}

export { TableHeading, TableContent };
