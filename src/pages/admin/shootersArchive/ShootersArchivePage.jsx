import React, { useContext, useEffect, useReducer, useState } from 'react';
import cx from 'classnames';
import { Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import DefaultButton from '../../../components/button/Button';
import { ReactComponent as AddIcon } from '../../../assets/icons/add.svg';

import ElementsList from './elementsList/ElementsList';
import styles from './ShootersArchivePage.module.css';
import NewModal from '../../../components/modal/RTUComponents/newModal/NewModal';
import Input from '../../../components/input/Input';
import AnimatedPage from '../../../components/animatedPage/AnimatedPage';
import DataContext from '../../../store/DataContext';
import fetchData from '../../../utils/fetchData';
import SelectWithHeading from '../../../components/select/SelectWithHeading';
import Select from '../../../components/select/Select';
import getArchivedShooters from '../../../utils/endpoints/getArchivedShooters';
import { toast } from 'react-toastify';

export default function ShootersArchivePage() {
  const { shooters, setShooters } = useContext(DataContext);

  const [isLoading, setIsLoading] = useState(true);
  const [preIsLoading, setPreIsLoading] = useState(true);
  const [loading, setLoading] = useState({
    step: 0,
    information: 'Trwa ładowanie zarchiwizowanych strzelców',
    isError: false,
  });
  const [archivedShooters, setArchivedShooters] = useState(null);

  const handleReturnShooter = async (id) => {
    try {
      const { status } = await fetchData({
        action: 'updateShooter',
        shooter_id: id,
        isArchived: 0,
      });

      //Only if fetch is success✅
      if (status === 200) {
        setShooters((prev) => [
          ...prev,
          archivedShooters.find((shooter) => shooter.shooter_id === id),
        ]);
        setArchivedShooters((prev) =>
          prev.filter((shooter) => shooter.shooter_id !== id),
        );
      }
    } catch (error) {
      toast.error('Coś poszło nie tak. Spróbuj ponownie.', {
        autoClose: 4000,
        closeButton: false,
        pauseOnHover: false,
      });
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        //Init animation
        setTimeout(() => {
          setLoading((prev) => ({ ...prev, step: 0.25 }));
        }, 0);

        //Fetch archived shooters
        let archived = await getArchivedShooters();
        archived = archived.data.map((item, index) => {
          item.index = index + 1;
          item.checked = false;
          item.visible = true;
          return item;
        });
        if (archived instanceof Array) {
          setArchivedShooters(archived);
        } else {
          setArchivedShooters([]);
        }

        //Finish animation
        setLoading((prev) => ({ ...prev, step: 1 }));
        setPreIsLoading(false);
      } catch (error) {
        setLoading((prev) => ({
          ...prev,
          information: (
            <>
              Wystąpił problem podczas ładowania danych.
              <br /> Proszę odświeżyć stronę, aby spróbować ponownie.
            </>
          ),
          isError: true,
        }));
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (!preIsLoading)
      setTimeout(() => {
        setIsLoading(!isLoading);
      }, 600);
  }, [preIsLoading]);

  return (
    <AnimatedPage>
      {isLoading && (
        <LoadingBar loading={loading} preIsLoading={preIsLoading} />
      )}

      {!preIsLoading && (
        <div className={styles.container}>
          <header className={styles.header}>
            <h1>Lista zarchiwizowanych strzelców</h1>
          </header>
          <section className={cx(styles.section)}>
            <ElementsList
              archivedShooters={archivedShooters}
              setArchivedShooters={setArchivedShooters}
              handleUpdate={handleReturnShooter}
            />
          </section>
        </div>
      )}
    </AnimatedPage>
  );
}

function LoadingBar({ loading, preIsLoading }) {
  return (
    <div
      className={cx(styles.loadingContainer, {
        [styles['loadingContainer__hide']]: !preIsLoading,
        [styles['loadingContainer__error']]: loading.isError,
      })}
    >
      <div className={styles.loaderBox}>
        <div
          className={styles['loaderBox--loader']}
          style={{
            transform: `scaleX(${loading.step})`,
          }}
        ></div>
      </div>
      <h1 className={styles.heading}>{loading.information}</h1>
    </div>
  );
}
