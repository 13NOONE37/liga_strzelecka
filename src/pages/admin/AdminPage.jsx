import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import cx from 'classnames';

import AdminSidebar from '../../components/adminSidebar/AdminSidebar';
import styles from './AdminPage.module.css';
import DataContext from '../../store/DataContext';
import fetchData from '../../utils/fetchData';
import getSchools from '../../utils/endpoints/getSchools';
import getShooters from '../../utils/endpoints/getShooters';
import FocusTrap from 'focus-trap-react';
import getContests from '../../utils/endpoints/getContests';

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
  const [contests, setContests] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        //Init animation
        setTimeout(() => {
          setLoading((prev) => ({ ...prev, step: 0.25 }));
        }, 0);

        //Fetch schools
        let schools = await getSchools();
        schools = schools.data.map((item, index) => {
          item.index = index + 1;
          item.checked = false;
          item.visible = true;
          return item;
        });
        if (schools instanceof Array) {
          setSchools(schools);
        } else {
          setSchools([]);
        }
        setLoading((prev) => ({
          ...prev,
          step: 0.33,
          information: 'Trwa ładowanie strzelców',
        }));

        //Fetch shooters
        let shooters = await getShooters();
        shooters = shooters.data.map((item, index) => {
          item.index = index + 1;
          item.checked = false;
          item.visible = true;
          return item;
        });
        if (shooters instanceof Array) {
          setShooters(shooters);
        } else {
          setShooters([]);
        }
        setLoading((prev) => ({
          ...prev,
          step: 0.66,
          information: 'Trwa ładowanie zawodów',
        }));

        //Fetch contests
        let contests = await getContests();
        contests = contests.data.map((item, index) => {
          item.index = index + 1;
          item.checked = false;
          item.visible = true;
          return item;
        });
        if (contests instanceof Array) {
          setContests(contests);
        } else {
          setContests([]);
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
        contests,
        setContests,
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
