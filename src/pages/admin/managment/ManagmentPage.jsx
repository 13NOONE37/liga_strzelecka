import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import styles from './ManagmentPage.module.css';
import AnimatedPage from '../../../components/animatedPage/AnimatedPage';
import {
  NavLink,
  Outlet,
  useNavigate,
  useParams,
  useResolvedPath,
} from 'react-router-dom';
import { ReactComponent as ArrowRight } from '../../../assets/icons/arrow_circle_right.svg';
import DefaultButton from '../../../components/button/Button';
import Loader from '../../../components/Loader/Loader';
import ContestsContext from '../../../store/ContestsContext';
import getTeams from '../../../utils/endpoints/getTeams';
import getContesters from '../../../utils/endpoints/getContesters';
export default function ManagmentPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useResolvedPath();

  const [isLoading, setIsLoading] = useState(true);
  const [preIsLoading, setPreIsLoading] = useState(true);
  const [loading, setLoading] = useState({
    step: 0,
    information: 'Trwa ładowanie drużyn',
    isError: false,
  });

  const [teams, setTeams] = useState(null);
  const [contesters, setContesters] = useState(null);
  const [contestId, setContestId] = useState(id);

  useEffect(() => {
    if (contestId === undefined) navigate('/admin/contests');

    const getData = async () => {
      try {
        //Init animation
        setTimeout(() => {
          setLoading((prev) => ({ ...prev, step: 0.25 }));
        }, 0);

        //Fetch teams
        let teams = await getTeams(contestId);
        teams = teams.data;
        // teams = teams.data.map((item, index) => {
        //   item.index = index + 1;
        //   item.checked = false;
        //   item.visible = true;
        //   return item;
        // });
        if (teams instanceof Array) {
          setTeams(teams);
        } else {
          setTeams([]);
        }
        setLoading((prev) => ({
          ...prev,
          step: 0.5,
          information: 'Trwa ładowanie wyników',
        }));

        //Fetch contesters
        let contesters = await getContesters(contestId);
        contesters = contesters.data;
        // teams = teams.data.map((item, index) => {
        //   item.index = index + 1;
        //   item.checked = false;
        //   item.visible = true;
        //   return item;
        // });
        if (contesters instanceof Array) {
          setContesters(contesters);
        } else {
          setContesters([]);
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
    <ContestsContext.Provider
      value={{ teams, setTeams, contesters, setContesters, contestId }}
    >
      <AnimatedPage>
        {isLoading && (
          <LoadingBar loading={loading} preIsLoading={preIsLoading} />
        )}

        {!preIsLoading && (
          <div className={styles.container}>
            <div className={styles.returnLink}>
              <DefaultButton
                style={'text'}
                icon={<ArrowRight />}
                iconPosition={'left'}
                text={'Powrót do listy zawodów'}
                action={() => navigate('/admin/contests')}
              />
            </div>
            <div>
              <nav className={styles.nav}>
                <button
                  className={cx({
                    [styles.activeLink]: pathname.includes('teams'),
                  })}
                  onClick={() =>
                    navigate(`/admin/contests/managment/teams/${contestId}`)
                  }
                >
                  Drużyny
                </button>
                <button
                  className={cx({
                    [styles.activeLink]: pathname.includes('results'),
                  })}
                  onClick={() =>
                    navigate(`/admin/contests/managment/results/${contestId}`)
                  }
                >
                  Wyniki
                </button>

                <button
                  className={cx({
                    [styles.activeLink]: pathname.includes('podium'),
                  })}
                  onClick={() =>
                    navigate(`/admin/contests/managment/podium/${contestId}`)
                  }
                >
                  Podium
                </button>
              </nav>
            </div>
            <Outlet />
          </div>
        )}
      </AnimatedPage>
    </ContestsContext.Provider>
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
