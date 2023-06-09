import React, { useId, useReducer } from 'react';
import cx from 'classnames';

import styles from './Input.module.css';
import { ReactComponent as SuccessIcon } from '../../assets/icons/check.svg';
import { ReactComponent as WarningIcon } from '../../assets/icons/warning.svg';
import { ReactComponent as ErrorIcon } from '../../assets/icons/error.svg';

export default function Input({
  heading,
  Icon,
  iconPosition, //left or right
  type,
  placeholder,
  value,
  onChange,
  status, // success, warning or error
  statusMessage,
  disabled,
  params,
}) {
  const [inputState, setInputState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      id: useId(),
      isActive: false,
    },
  );

  const inputBox = cx(styles['input--box'], {
    [styles['input--box__active']]: value.length > 0 || inputState.isActive,
    [styles[`input--box__offset__${iconPosition}`]]: iconPosition,
    [styles[`input--box__${status}`]]: status,
    [styles['input--box__disabled']]: disabled,
  });

  return (
    <div className={styles['box']}>
      {heading && (
        <label className={styles['label']} htmlFor={inputState.id}>
          {heading}
        </label>
      )}
      <div className={inputBox}>
        {placeholder && (
          <span className={styles['input--placeholder']}>{placeholder}</span>
        )}

        <input
          className={styles['input']}
          id={inputState.id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setInputState({ isActive: true })}
          onBlur={() => setInputState({ isActive: false })}
          disabled={disabled}
          {...params}
        />
        {Icon && (
          <span className={styles['input--icon']}>
            <Icon />
          </span>
        )}
      </div>
      {status && (
        <span className={`${styles['status']} ${styles[`status__${status}`]}`}>
          {status === 'success' && <SuccessIcon />}
          {status === 'warning' && <WarningIcon />}
          {status === 'error' && <ErrorIcon />}
          {statusMessage}
        </span>
      )}
    </div>
  );
}
