import React, { useId, useReducer } from 'react';
import cx from 'classnames';

import styles from './Button.module.css';
import { ReactComponent as Load } from '../../assets/icons/load.svg';

export default function DefaultButton({
  style, //primary, secondary, text default is primary
  text,
  Icon,
  iconPosition, //left or right
  type,
  action,
  size, //big, medium or small default is big
  customSize,
  disabled,
  isLoading,
  params,
}) {
  const buttonClasses = cx(styles.button, {
    [styles[`button__offset__${iconPosition}`]]: iconPosition,
    [styles[`button__disabled`]]: disabled,
    [styles[`button__${size}`]]: size,
    [styles[`button__${style}`]]: style,
  });
  return (
    <button
      className={buttonClasses}
      onClick={action}
      type={type}
      disabled={disabled}
      style={customSize ?? {}}
      {...params}
    >
      {Icon ? (
        isLoading ? (
          <Load className={styles.loading} />
        ) : (
          <Icon />
        )
      ) : (
        <></>
      )}
      <span>
        {!Icon && isLoading ? <Load className={styles.loading} /> : text}
      </span>
    </button>
  );
}

// export function IconButton({}) {
//   return <button></button>;
// }
