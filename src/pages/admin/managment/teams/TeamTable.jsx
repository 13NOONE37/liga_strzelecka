import React, { useState } from 'react';
import fetchData from '../../../../utils/fetchData';
import { IconButton } from '../../../../components/button/Button';
import cx from 'classnames';
import styles from './TeamsPage.module.css';
import { ReactComponent as DeleteIcon } from '../../../../assets/icons/delete.svg';
import { ReactComponent as EditIcon } from '../../../../assets/icons/edit.svg';
import ConfirmDelete from './ConfirmDelete';

function TeamTable({
  contesters,
  setContesters,
  setTeams,
  shooters,
  schools,
  team,
  setEditing,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDelete = async () => {
    try {
      const { status } = await fetchData({
        action: 'deleteTeam',
        contest_id: team.contest_id,
        team_id: team.team_id,
      });
      if (status === 200) {
        setShowDeleteModal(false);
        setContesters((prev) =>
          prev.filter((contester) => contester.team_id !== team.team_id),
        );
        setTeams((prev) =>
          prev.filter((team2) => team2.team_id !== team.team_id),
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
  const schoolName = schools.find(
    (school) => school.school_id === team.school_id,
  ).name;
  const teamContesters = contesters.filter(
    (contester) =>
      contester.team_id === team.team_id && contester.isInTeam === 1,
  );
  const individualContesters = contesters.filter(
    (contester) =>
      contester.team_id === team.team_id && contester.isInTeam === 0,
  );
  return (
    <>
      <div className={styles.table}>
        <div className={styles['table--nav']}>
          <IconButton
            icon={<EditIcon />}
            action={() =>
              setEditing(
                team.team_id,
                team.school_id,
                schoolName,
                teamContesters,
                individualContesters,
              )
            }
            size={'small'}
            style={'secondary'}
          />
          <span className={styles.teamName}>Drużyna - {schoolName}</span>
          <IconButton
            icon={<DeleteIcon />}
            action={() => setShowDeleteModal(true)}
            size={'small'}
            style={'secondary'}
          />
        </div>
        <div className={styles['table--results']}>
          <div className={styles['table--row']}>
            {teamContesters.map((contester) => {
              const shooter = shooters.find(
                (shooter) => shooter.shooter_id === contester?.shooter_id,
              );

              return (
                <span
                  className={cx(styles['table--row--element'])}
                  key={`${contester?.shooter_id}_${contester?.team_id}`}
                >
                  {shooter?.firstName} {shooter?.secondName}
                </span>
              );
            })}
          </div>
        </div>
        {individualContesters?.length > 0 && (
          <>
            <div className={styles['table--nav--individual']}>
              <span>Strzelcy indywidualni</span>
            </div>
            <div className={styles['table--results']}>
              <div className={styles['table--row']}>
                {individualContesters.map((contester) => {
                  const shooter = shooters.find(
                    (shooter) => shooter.shooter_id === contester.shooter_id,
                  );

                  return (
                    <span
                      className={cx(styles['table--row--element'])}
                      key={shooter.shooter_id}
                    >
                      {shooter.firstName} {shooter.secondName}
                    </span>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {showDeleteModal && (
        <ConfirmDelete
          schoolName={schoolName}
          setShowDeleteModal={setShowDeleteModal}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
}
export default React.memo(TeamTable);
