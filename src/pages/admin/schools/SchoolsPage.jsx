import React, { useState } from 'react';
import DefaultButton from '../../../components/button/Button';
import { ReactComponent as AddIcon } from '../../../assets/icons/add.svg';

import ElementsList from './elementsList/ElementsList';
import styles from './SchoolsPage.module.css';

export default function SchoolsPage() {
  const [schools, setSchools] = useState([
    { id: 1, name: 'Szkoła Podstawowa nr 1' },
    { id: 2, name: 'Gimnazjum im. Jana Kowalskiego' },
    { id: 3, name: 'Liceum Ogólnokształcące nr 5' },
    { id: 4, name: 'Szkoła Artystyczna dla Młodych Talentów' },
    { id: 5, name: 'Technikum Elektryczne im. Marii Skłodowskiej-Curie' },
    { id: 6, name: 'Szkoła Podstawowa nr 3' },
  ]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Lista szkół</h1>
        <DefaultButton
          text={'Dodaj nową'}
          Icon={() => <AddIcon />}
          size={'medium'}
          iconPosition={'right'}
        />
      </header>
      <section className={styles.section}>
        <ElementsList data={schools} setData={setSchools} />
      </section>
    </div>
  );
}
