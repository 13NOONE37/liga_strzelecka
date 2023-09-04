import React, { useContext, useMemo, useState } from 'react';
import cx from 'classnames';

import styles from './ResultsPage.module.css';
import Select from '../../../../components/select/Select';
import SelectWithHeading from '../../../../components/select/SelectWithHeading';
import ContestsContext from '../../../../store/ContestsContext';
import DefaultButton, {
  IconButton,
} from '../../../../components/button/Button';
import { ReactComponent as DownIcon } from '../../../../assets/icons/arrow_drop_down.svg';
import DataContext from '../../../../store/DataContext';
import ShootTable from './ShootTable';
export default function ResultsPage() {
  const { schools, shooters } = useContext(DataContext);
  const { teams, contesters, setContesters, contestId } =
    useContext(ContestsContext);

  const localTeams = useMemo(() =>
    teams
      .filter((team) => team.contest_id === contestId)
      .map((team) => {
        return {
          label: schools.find(({ school_id }) => school_id === team.school_id)
            .name,
          value: team.team_id,
        };
      }),
  );
  const [currentTeam, setCurrentTeam] = useState(localTeams[0] ?? null);
  const [currentMode, setCurrentMode] = useState({
    value: 1,
    label: 'Karta drużyny',
  });

  const setNextTeam = () => {
    setCurrentTeam(
      localTeams[
        (localTeams.findIndex((team) => team.value === currentTeam.value) + 1) %
          localTeams.length
      ],
    );
  };
  const setPrevTeam = () => {
    setCurrentTeam(
      localTeams[
        (localTeams.findIndex((team) => team.value === currentTeam.value) -
          1 +
          localTeams.length) %
          localTeams.length
      ],
    );
  };

  return localTeams.length > 0 ? (
    <div className={styles.container}>
      <div className={styles.topControls}>
        <Select
          options={localTeams}
          value={currentTeam}
          onChange={(value) => setCurrentTeam(value)}
          placeholder={'Szkoła'}
          height={50}
        />
        <Select
          options={[
            { value: 1, label: 'Karta drużyny' },
            { value: 0, label: 'Karta indywidualna' },
          ]}
          value={currentMode}
          onChange={(value) => setCurrentMode(value)}
          height={50}
        />
      </div>
      <div className={styles.leftControls}>
        <IconButton
          icon={<DownIcon />}
          action={setPrevTeam}
          additionalClasses={[styles.upButton]}
        />
        <IconButton
          icon={<DownIcon />}
          action={setNextTeam}
          additionalClasses={[styles.downButton]}
        />
      </div>
      <ShootTable
        contesters={contesters}
        setContesters={setContesters}
        shooters={shooters}
        currentTeam={currentTeam?.value}
        currentMode={currentMode?.value}
      />
    </div>
  ) : (
    <h2 className={styles.empty}>Brak drużyn</h2>
  );
}
