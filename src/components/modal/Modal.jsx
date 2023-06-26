import React, { useRef } from 'react';
import FocusTrap from 'focus-trap-react';
import styles from './Modal.module.css';
import { useDetectOutsideClick } from '../../hooks/useDetectOutsideClick';

export default function Modal({ children, handleClose }) {
  const containerRef = useRef(null);
  const boxRef = useRef(null);

  const handlePreClose = () => {
    containerRef.current.classList.add(styles.hide);
    boxRef.current.classList.add(styles.hide);
    setTimeout(() => {
      handleClose();
    }, 450);
  };

  useDetectOutsideClick(boxRef, handlePreClose);
  return (
    <FocusTrap>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.box} ref={boxRef}>
          {children(handlePreClose)}
        </div>
      </div>
    </FocusTrap>
  );
}
