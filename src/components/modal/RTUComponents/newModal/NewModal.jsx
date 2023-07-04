import React, { useRef, useState } from 'react';
import cx from 'classnames';
import styles from './NewModal.module.css';
import FocusTrap from 'focus-trap-react';
import DefaultButton, {
  IconButton,
} from '../../../../components/button/Button';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/close.svg';
import { useDetectOutsideClick } from '../../../../hooks/useDetectOutsideClick';
import Input from '../../../../components/input/Input';

export default function NewModal({
  setShowModal,
  setPreShowModal,
  headline,
  width,
  inTimeMs,
  outTimeMs,
  children,
}) {
  const containerRef = useRef(null);
  const modalRef = useRef(null);

  const handleClose = () => {
    setPreShowModal(false);
    containerRef.current.classList.add(styles['hide']);
    modalRef.current.classList.add(styles['newModal__hide']);
    setTimeout(() => {
      setShowModal(false);
    }, inTimeMs);
  };

  useDetectOutsideClick(modalRef, handleClose);

  return (
    <FocusTrap focusTrapOptions={{ initialFocus: false }}>
      <div
        className={styles.container}
        ref={containerRef}
        style={{
          '--inTime': `${inTimeMs}ms`,
          '--outTime': `${outTimeMs}ms`,
        }}
      >
        <div
          className={styles.newModal}
          style={{ width: width }}
          ref={modalRef}
        >
          <div className={styles.closeBar}>
            <h2>{headline}</h2>
            <IconButton
              size={'medium'}
              icon={<CloseIcon />}
              action={handleClose}
            />
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </FocusTrap>
  );
}
