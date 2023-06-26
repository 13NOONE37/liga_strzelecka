import React from 'react';
import cx from 'classnames';
import styles from './ContextMenu.module.css';
export default function ContextMenu({ options, children }) {
  return (
    <div className={styles.container}>
      {children}
      <ul className={styles.contextMenu}>
        {options.map(({ Icon, text, action }, index) => (
          <li className={styles['contextMenu--element']}>
            <button onClick={action} type="button">
              <Icon />
              {text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
