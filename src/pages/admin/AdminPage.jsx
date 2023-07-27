import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import cx from 'classnames';

import AdminSidebar from '../../components/adminSidebar/AdminSidebar';
import styles from './AdminPage.module.css';
import DataContext from '../../store/DataContext';
import fetchData from '../../utils/fetchData';
import getSchools from '../../utils/endpoints/schools/getSchools';
import getShooters from '../../utils/endpoints/shooters/getShooters';
import FocusTrap from 'focus-trap-react';

export default function AdminPage() {
  const [preIsLoading, setPreIsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState({
    step: 0,
    information: 'Trwa ładowanie szkół',
    isError: false,
  });

  const [schools, setSchools] = useState(null);
  const [shooters, setShooters] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setTimeout(() => {
          setLoading((prev) => ({ ...prev, step: 0.25 }));
        }, 0);

        //Fetch schools
        const schools = await getSchools();
        if (schools.data instanceof Array) {
          setSchools(schools.data);
        } else {
          setSchools([]);
        }
        setLoading((prev) => ({
          ...prev,
          step: 0.5,
          information: 'Trwa ładowanie strzelców',
        }));

        //Fetch shooters
        const shooters = await getShooters();
        if (shooters.data instanceof Array) {
          setShooters(shooters.data);
        } else {
          setShooters([]);
        }

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
        console.log(error);
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
    <DataContext.Provider
      value={{
        schools,
        setSchools,
        shooters,
        setShooters,
      }}
    >
      <div className={styles.container}>
        <AdminSidebar />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
      {isLoading && (
        <LoadingBar loading={loading} preIsLoading={preIsLoading} />
      )}
    </DataContext.Provider>
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
