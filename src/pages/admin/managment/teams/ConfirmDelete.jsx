import React, { useState } from 'react';
import ConfirmModal from '../../../../components/modal/RTUComponents/ConfirmModal/ConfirmModal';
import styles from './TeamsPage.module.css';

export default function ConfirmDelete({
  schoolName,
  setShowDeleteModal,
  handleDelete,
}) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ConfirmModal
      content={<span className={styles.confirmDeleteName}>{schoolName}</span>}
      heading={'Czy na pewno chcesz usunąć wybraną drużynę?'}
      secondaryText={'Anuluj'}
      primaryText={'Usuń'}
      handleClose={() => {
        setIsLoading(false);
        setShowDeleteModal(false);
      }}
      isLoading={isLoading}
      handleConfirm={() => {
        setIsLoading(true);
        handleDelete();
      }}
    />
  );
}
