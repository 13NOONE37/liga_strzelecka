import React, { useContext, useEffect, useReducer, useState } from 'react';
import cx from 'classnames';
import styles from './PodiumPage.module.css';
import Select from '../../../../components/select/Select';
import SelectWithHeading from '../../../../components/select/SelectWithHeading';
import ContestsContext from '../../../../store/ContestsContext';
import DataContext from '../../../../store/DataContext';
import { ReactComponent as EditIcon } from '../../../../assets/icons/edit.svg';
import { IconButton } from '../../../../components/button/Button';
import ConfirmModal from '../../../../components/modal/RTUComponents/ConfirmModal/ConfirmModal';
import { toast } from 'react-toastify';
import fetchData from '../../../../utils/fetchData';

const TEAM_PODIUM = -1;
const WOMEN_PODIUM = 0;
const MEN_PODIUM = 1;

const PLACE_NAMES = {
  first_place_team_id: 'first_place_team_id',
  second_place_team_id: 'second_place_team_id',
  third_place_team_id: 'third_place_team_id',
  woman_first_place_shooter_id: 'woman_first_place_shooter_id',
  woman_second_place_shooter_id: 'woman_second_place_shooter_id',
  woman_third_place_shooter_id: 'woman_third_place_shooter_id',
  man_first_place_shooter_id: 'man_first_place_shooter_id',
  man_second_place_shooter_id: 'man_second_place_shooter_id',
  man_third_place_shooter_id: 'man_third_place_shooter_id',
};

export default function PodiumPage() {
  const { contesters, teams, contestId } = useContext(ContestsContext);
  const { shooters, schools, contests, setContests } = useContext(DataContext);

  const [podiumState, setPodiumState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      currentPodium: {
        label: 'Drużyny',
        value: TEAM_PODIUM,
      },
      currentContest: contests.find(
        (contest) => contest.contest_id === contestId,
      ),
      showAddModal: false,
      currentPlaceName: null,
      options: [],
    },
  );

  const handleUpdate = async (id, placeName) => {
    try {
      const { status } = await fetchData({
        action: 'updatePodium',
        contest_id: contestId,
        [placeName]: id,
      });

      const idsToNull = [];
      setContests((prev) =>
        prev.map((contest) => {
          if (contest.contest_id === contestId) {
            const newContest = { ...contest };
            Object.entries(newContest).forEach((entry) => {
              if (
                entry[1] === id &&
                entry[0] !== 'location' &&
                entry[0] !== placeName
              ) {
                newContest[entry[0]] = null;
                idsToNull.push(
                  fetchData({
                    action: 'updatePodium',
                    contest_id: contestId,
                    [entry[0]]: '',
                  }),
                );
              }
            });
            newContest[placeName] = id;
            return newContest;
          }

          return { ...contest };
        }),
      );
      Promise.all(idsToNull)
        .then()
        .catch((error) => {
          toast.error(`Coś poszło nie tak. Spróbuj ponownie."`, {
            autoClose: 5000,
          });
        });
      setPodiumState({
        showAddModal: false,
        currentPlaceName: null,
      });
    } catch (error) {
      toast.error(`Coś poszło nie tak. Spróbuj ponownie."`, {
        autoClose: 5000,
      });
    }
  };

  const sumContesterPoints = (contester) => {
    let sum = 0;

    for (let i = 1; i <= 10; i++) {
      const shootKey = `shoot_${i}`;
      if (typeof contester[shootKey] === 'number') {
        sum += contester[shootKey];
      }
    }

    return sum;
  };

  useEffect(() => {
    setPodiumState({
      currentContest: contests.find(
        (contest) => contest.contest_id === contestId,
      ),
    });
  }, [contests]);

  useEffect(() => {
    let newOptions;
    if (podiumState.currentPodium.value === TEAM_PODIUM) {
      newOptions = teams
        .filter((team) => team.contest_id === contestId)
        .map((team) => {
          const currentTeam = schools.find(
            (school) => school.school_id === team.school_id,
          );

          const sumOfPoints = contesters.reduce((sum, contester) => {
            return contester.team_id === team.team_id && contester.isInTeam
              ? sum + sumContesterPoints(contester)
              : sum;
          }, 0);

          return {
            name: currentTeam.name,
            score: sumOfPoints,
            value: team.school_id,
          };
        });
    } else {
      newOptions = contesters
        .filter(
          (contester) =>
            shooters.find(
              (shooter) => shooter.shooter_id === contester.shooter_id,
            )?.isMan === podiumState.currentPodium.value,
        )
        .map((contester) => {
          const currentShooter = shooters.find(
            (shooter) => shooter.shooter_id === contester.shooter_id,
          );

          return {
            name: `${currentShooter.firstName} ${currentShooter.secondName}`,
            score: sumContesterPoints(contester),
            value: contester.shooter_id,
          };
        });
    }

    newOptions.sort((a, b) => b.score - a.score);
    newOptions = newOptions.map((option) => ({
      label: `${option.name} - ${option.score}pkt `,
      value: option.value,
    }));

    setPodiumState({ options: newOptions });
  }, [podiumState.currentPodium]);

  return (
    <div className={styles.container}>
      <div className={styles.podiumSelect}>
        <SelectWithHeading heading={'Wybierz podium:'}>
          <Select
            options={[
              { label: 'Drużyny', value: TEAM_PODIUM },
              { label: 'Kobiety', value: WOMEN_PODIUM },
              { label: 'Mężczyźni', value: MEN_PODIUM },
            ]}
            value={podiumState.currentPodium}
            onChange={(value) => setPodiumState({ currentPodium: value })}
            height={50}
          />
        </SelectWithHeading>
      </div>
      <div className={styles.table}>
        <div className={styles['table--nav']}>
          <span>Miejsce</span>
          <span>
            {podiumState.currentPodium.value === TEAM_PODIUM
              ? 'Szkoła'
              : 'Imię i nazwisko'}
          </span>
          <span></span>
        </div>
        <div className={styles['table--results']}>
          {podiumState.currentPodium.value === TEAM_PODIUM && (
            <TeamsPodium
              currentContest={podiumState.currentContest}
              setPodiumState={setPodiumState}
            />
          )}
          {podiumState.currentPodium.value === WOMEN_PODIUM && (
            <WomenPodium
              currentContest={podiumState.currentContest}
              setPodiumState={setPodiumState}
            />
          )}
          {podiumState.currentPodium.value === MEN_PODIUM && (
            <MenPodium
              currentContest={podiumState.currentContest}
              setPodiumState={setPodiumState}
            />
          )}
        </div>
      </div>
      {podiumState.showAddModal && (
        <AddModal
          contests={contests}
          contestId={contestId}
          podiumState={podiumState}
          setPodiumState={setPodiumState}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
function PodiumPlace({ place, value, showModal }) {
  return (
    <div className={styles['table--row']}>
      <span
        className={cx(styles['table--row--element'], {
          [styles.gold]: place === 1,
          [styles.silver]: place === 2,
          [styles.bronze]: place === 3,
        })}
      >
        {place}
      </span>
      <span className={cx(styles['table--row--element'])}>{value}</span>
      <span
        className={cx(
          styles['table--row--element'],
          styles['table--row--element__edit'],
        )}
      >
        <IconButton
          icon={<EditIcon />}
          size={'small'}
          style={'secondary'}
          action={showModal}
        />
      </span>
    </div>
  );
}
function TeamsPodium({ currentContest, setPodiumState }) {
  const { schools } = useContext(DataContext);

  return (
    <>
      <PodiumPlace
        showModal={() => {
          setPodiumState({
            showAddModal: true,
            currentPlaceName: PLACE_NAMES.first_place_team_id,
          });
        }}
        place={1}
        value={
          schools.find(
            ({ school_id }) =>
              school_id === currentContest[PLACE_NAMES.first_place_team_id],
          )?.name
        }
      />
      <PodiumPlace
        showModal={() => {
          setPodiumState({
            showAddModal: true,
            currentPlaceName: PLACE_NAMES.second_place_team_id,
          });
        }}
        place={2}
        value={
          schools.find(
            ({ school_id }) =>
              school_id === currentContest[PLACE_NAMES.second_place_team_id],
          )?.name
        }
      />
      <PodiumPlace
        showModal={() => {
          setPodiumState({
            showAddModal: true,
            currentPlaceName: PLACE_NAMES.third_place_team_id,
          });
        }}
        place={3}
        value={
          schools.find(
            ({ school_id }) =>
              school_id === currentContest[PLACE_NAMES.third_place_team_id],
          )?.name
        }
      />
    </>
  );
}

function WomenPodium({ currentContest, setPodiumState }) {
  const { shooters } = useContext(DataContext);

  const getName = (placeName) => {
    const shooter = shooters.find(
      ({ shooter_id }) => shooter_id === currentContest[placeName],
    );
    return shooter ? `${shooter.firstName} ${shooter.secondName}` : '';
  };

  return (
    <>
      <PodiumPlace
        showModal={() => {
          setPodiumState({
            showAddModal: true,
            currentPlaceName: PLACE_NAMES.woman_first_place_shooter_id,
          });
        }}
        place={1}
        value={getName(PLACE_NAMES.woman_first_place_shooter_id)}
      />
      <PodiumPlace
        showModal={() => {
          setPodiumState({
            showAddModal: true,
            currentPlaceName: PLACE_NAMES.woman_second_place_shooter_id,
          });
        }}
        place={2}
        value={getName(PLACE_NAMES.woman_second_place_shooter_id)}
      />
      <PodiumPlace
        showModal={() => {
          setPodiumState({
            showAddModal: true,
            currentPlaceName: PLACE_NAMES.woman_third_place_shooter_id,
          });
        }}
        place={3}
        value={getName(PLACE_NAMES.woman_third_place_shooter_id)}
      />
    </>
  );
}

function MenPodium({ currentContest, setPodiumState }) {
  const { shooters } = useContext(DataContext);

  const getName = (placeName) => {
    const shooter = shooters.find(
      ({ shooter_id }) => shooter_id === currentContest[placeName],
    );
    return shooter ? `${shooter.firstName} ${shooter.secondName}` : '';
  };

  return (
    <>
      <PodiumPlace
        showModal={() => {
          setPodiumState({
            showAddModal: true,
            currentPlaceName: PLACE_NAMES.man_first_place_shooter_id,
          });
        }}
        place={1}
        value={getName(PLACE_NAMES.man_first_place_shooter_id)}
      />
      <PodiumPlace
        showModal={() => {
          setPodiumState({
            showAddModal: true,
            currentPlaceName: PLACE_NAMES.man_second_place_shooter_id,
          });
        }}
        place={2}
        value={getName(PLACE_NAMES.man_second_place_shooter_id)}
      />
      <PodiumPlace
        showModal={() => {
          setPodiumState({
            showAddModal: true,
            currentPlaceName: PLACE_NAMES.man_third_place_shooter_id,
          });
        }}
        place={3}
        value={getName(PLACE_NAMES.man_third_place_shooter_id)}
      />
    </>
  );
}

function AddModal({ podiumState, setPodiumState, handleUpdate }) {
  const { contestId } = useContext(ContestsContext);
  const { schools, shooters, contests } = useContext(DataContext);

  const findSelectedOption = () => {
    const selectedId = contests.find(
      ({ contest_id }) => contest_id === contestId,
    )?.[podiumState.currentPlaceName];

    if (podiumState.currentPlaceName.includes('team_id') && selectedId) {
      return schools.find(({ school_id }) => school_id === selectedId)
        ?.school_id;
    } else if (
      podiumState.currentPlaceName.includes('shooter_id') &&
      selectedId
    ) {
      return shooters.find(({ shooter_id }) => shooter_id === selectedId)
        ?.shooter_id;
    }

    return null;
  };

  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState(() => {
    const foundOption = findSelectedOption();
    return foundOption
      ? podiumState.options.find(({ value }) => value === foundOption)
      : podiumState.options[0];
  });

  return (
    <ConfirmModal
      additionaLStyles={{
        minHeight: '350px',
      }}
      content={
        <div className={styles.placeSelect}>
          <Select
            options={podiumState.options}
            value={selectedValue}
            onChange={(value) => setSelectedValue(value)}
            backgroundColor="#222131"
            height={50}
            width={450}
            maxMenuHeight={'200px'}
          />
        </div>
      }
      heading={`Wybierz ${
        podiumState.currentPodium.value === TEAM_PODIUM ? 'szkołę' : 'strzelca'
      }`}
      isLoading={isLoading}
      secondaryText="Anuluj"
      primaryText="Dodaj"
      handleClose={() => {
        setIsLoading(false);
        setPodiumState({
          showAddModal: false,
          currentPlaceName: null,
        });
      }}
      handleConfirm={() => {
        setIsLoading(true);
        handleUpdate(selectedValue.value, podiumState.currentPlaceName);
      }}
    />
  );
}
