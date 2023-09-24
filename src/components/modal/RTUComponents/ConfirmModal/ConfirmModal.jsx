import React from 'react';
import styles from './ConfirmModal.module.css';
import Modal from '../../Modal';
import DefaultButton, { IconButton } from '../../../button/Button';

import { ReactComponent as CloseIcon } from '../../../../assets/icons/close.svg';

export default function ConfirmModal({
  handleClose,
  handleConfirm,
  heading,
  content,
  primaryText,
  secondaryText,
  isLoading,
  additionaLStyles = {},
}) {
  return (
    <Modal handleClose={handleClose}>
      {(handlePreClose) => (
        <div className={styles.container} style={{ ...additionaLStyles }}>
          <IconButton
            icon={<CloseIcon />}
            size={'medium'}
            additionalClasses={[styles.close]}
            action={handlePreClose}
          />
          <h1 className={styles.heading}>{heading}</h1>
          <div className={styles.content}>{content}</div>
          <DefaultButton
            style={'secondary'}
            text={secondaryText}
            additionalClasses={[styles.secondary]}
            action={handlePreClose}
            autoFocus={true}
          />
          <DefaultButton
            text={primaryText}
            additionalClasses={[styles.primary]}
            action={handleConfirm}
            isLoading={isLoading}
          />
        </div>
      )}
    </Modal>
  );
}
