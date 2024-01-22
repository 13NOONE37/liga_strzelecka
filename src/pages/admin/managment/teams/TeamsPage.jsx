import React, { useContext, useReducer, useState } from 'react';
import cx from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import styles from './TeamsPage.module.css';
import modalStyles from './AddModal.module.css';
import DefaultButton, {
  IconButton,
} from '../../../../components/button/Button';

import Select from '../../../../components/select/Select';
import { ReactComponent as AddIcon } from '../../../../assets/icons/add.svg';
import NewModal from '../../../../components/modal/RTUComponents/newModal/NewModal';
import DataContext from '../../../../store/DataContext';
import ContestsContext from '../../../../store/ContestsContext';
import { Formik } from 'formik';

import SelectWithHeading from '../../../../components/select/SelectWithHeading';
import fetchData from '../../../../utils/fetchData';
import TeamTable from './TeamTable';
import { toast } from 'react-toastify';

export default function TeamsPage() {
  const { schools, shooters } = useContext(DataContext);
  const { teams, setTeams, contesters, setContesters, contestId } =
    useContext(ContestsContext);
  const [teamsState, setTeamsState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      showModal: false,
      preShowModal: false,
      shotSelectModal: false,
      edit: {},

      isFocused: false,
    },
  );

  const convertShootersToSelectOptions = (items) => {
    return items.map((item) => {
      const person = shooters.find(
        (shooter) => shooter.shooter_id === item.shooter_id,
      );
      return {
        label: `${person.firstName} ${person.secondName}`,
        value: item.shooter_id,
      };
    });
  };
  const formInitialValues = {
    team: teamsState.edit?.teamContesters
      ? convertShootersToSelectOptions(teamsState.edit.teamContesters)
      : null,
    individuals: teamsState.edit?.individualContesters
      ? convertShootersToSelectOptions(teamsState.edit.individualContesters)
      : null,
    school: teamsState.edit?.schoolName
      ? { value: teamsState.edit.school_id, label: teamsState.edit.schoolName }
      : null,
  };

  const handleValidate = (values) => {
    const errors = {};
    if (!teamsState.isFocused) return errors;

    if (!values.school) {
      errors.school = {
        status: 'warning',
        message: 'Najpierw musisz wybrać szkołę',
      };
    }
    if (!values.team || values.team.length < 6) {
      errors.team = {
        status: 'warning',
        message: 'Musisz wybrać 6 członków drużyny',
      };
    }
    return errors;
  };
  const handleSubmitAdd = async (values, { setSubmitting, resetForm }) => {
    try {
      const newTeams = [...teams];
      const newContesters = [...contesters];
      const id = uuidv4();

      newTeams.push({
        contest_id: contestId,
        school_id: values.school.value,
        team_id: id,
      });

      const { status } = await fetchData({
        action: 'createTeam',
        contest_id: contestId,
        school_id: values.school.value,
        team_id: id,
      });

      //Only if fetch is success✅
      if (status === 200) {
        const contestersToAdd = [];
        if (values.team) {
          for (const contester of values.team) {
            contestersToAdd.push(
              fetchData({
                action: 'createContester',
                team_id: id,
                shooter_id: contester.value,
                isInTeam: 1,
              }),
            );
            newContesters.push({
              team_id: id,
              shooter_id: contester.value,
              isInTeam: 1,
              shoot_1: null,
              shoot_2: null,
              shoot_3: null,
              shoot_4: null,
              shoot_5: null,
              shoot_6: null,
              shoot_7: null,
              shoot_8: null,
              shoot_9: null,
              shoot_10: null,
            });
          }
        }

        if (values.individuals) {
          for (const contester of values.individuals) {
            contestersToAdd.push(
              fetchData({
                action: 'createContester',
                team_id: id,
                shooter_id: contester.value,
                isInTeam: 0,
              }),
            );
            newContesters.push({
              team_id: id,
              shooter_id: contester.value,
              isInTeam: 0,
              shoot_1: null,
              shoot_2: null,
              shoot_3: null,
              shoot_4: null,
              shoot_5: null,
              shoot_6: null,
              shoot_7: null,
              shoot_8: null,
              shoot_9: null,
              shoot_10: null,
            });
          }
        }

        Promise.all(contestersToAdd)
          .then(() => {
            setTeamsState({
              preShowModal: false,
            });

            setTeams(newTeams);
            setContesters(newContesters);
            resetForm();
          })
          .catch((error) => {
            toast.error('Coś poszło nie tak. Spróbuj ponownie.', {
              autoClose: 4000,
              closeButton: false,
              pauseOnHover: false,
            });
          });
      }
    } catch (error) {
      toast.error('Coś poszło nie tak. Spróbuj ponownie.', {
        autoClose: 4000,
        closeButton: false,
        pauseOnHover: false,
      });
    }
    setSubmitting(false);
  };

  const getDifference = (setA, setB) => {
    return new Set([...setA].filter((element) => !setB.has(element)));
  };
  const handleUpdate = async (values, { setSubmitting, resetForm }) => {
    try {
      const newContesters = [...contesters];

      const oldIndividuals = new Set(
        teamsState.edit.individualContesters.map((item) => item.shooter_id),
      );
      const newIndividuals = new Set(
        values.individuals.map((item) => item.value),
      );
      const oldTeam = new Set(
        teamsState.edit.teamContesters.map((item) => item.shooter_id),
      );
      const newTeam = new Set(values.team.map((item) => item.value));

      const individualsToDelete = getDifference(oldIndividuals, newIndividuals);
      const individualsToAdd = getDifference(newIndividuals, oldIndividuals);
      const teamToDelete = getDifference(oldTeam, newTeam);
      const teamToAdd = getDifference(newTeam, oldTeam);
      const team_id = teamsState.edit.team_id;

      const contestersToDelete = [];
      for (let shooter_id of [...individualsToDelete, ...teamToDelete]) {
        contestersToDelete.push(
          fetchData({
            action: 'deleteContester',
            team_id: team_id,
            shooter_id: shooter_id,
          }),
        );
      }

      Promise.all(contestersToDelete).then(() => {
        const contestersToAdd = [];
        for (const shooter_id of teamToAdd) {
          contestersToAdd.push(
            fetchData({
              action: 'createContester',
              team_id: team_id,
              shooter_id: shooter_id,
              isInTeam: 1,
            }),
          );
          newContesters.push({
            team_id: team_id,
            shooter_id: shooter_id,
            isInTeam: 1,
            shoot_1: null,
            shoot_2: null,
            shoot_3: null,
            shoot_4: null,
            shoot_5: null,
            shoot_6: null,
            shoot_7: null,
            shoot_8: null,
            shoot_9: null,
            shoot_10: null,
          });
        }
        for (const shooter_id of individualsToAdd) {
          contestersToAdd.push(
            fetchData({
              action: 'createContester',
              team_id: team_id,
              shooter_id: shooter_id,
              isInTeam: 0,
            }),
          );
          newContesters.push({
            team_id: team_id,
            shooter_id: shooter_id,
            isInTeam: 0,
            shoot_1: null,
            shoot_2: null,
            shoot_3: null,
            shoot_4: null,
            shoot_5: null,
            shoot_6: null,
            shoot_7: null,
            shoot_8: null,
            shoot_9: null,
            shoot_10: null,
          });
        }
        Promise.all(contestersToAdd).then(() => {
          setTeamsState({
            preShowModal: false,
          });

          setContesters(
            newContesters.filter(
              (contester) =>
                !(
                  individualsToDelete.has(contester.shooter_id) &&
                  contester.team_id === team_id &&
                  contester.isInTeam == 0
                ) &&
                !(
                  teamToDelete.has(contester.shooter_id) &&
                  contester.team_id === team_id &&
                  contester.isInTeam == 1
                ),
            ),
          );
          resetForm();
        });
      });
    } catch (error) {
      toast.error('Coś poszło nie tak. Spróbuj ponownie.', {
        autoClose: 4000,
        closeButton: false,
        pauseOnHover: false,
      });
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <DefaultButton
        text={'Dodaj'}
        icon={<AddIcon />}
        size={'medium'}
        iconPosition={'right'}
        action={() => {
          setTeamsState({ showModal: true, preShowModal: true });
        }}
        additionalClasses={[styles.addButton]}
      />
      <section className={styles.teamsContainer}>
        {teams.length > 0 ? (
          teams.map((team) => (
            <TeamTable
              contesters={contesters}
              setContesters={setContesters}
              setTeams={setTeams}
              shooters={shooters}
              schools={schools}
              team={team}
              setEditing={(
                team_id,
                school_id,
                schoolName,
                teamContesters,
                individualContesters,
              ) =>
                setTeamsState({
                  edit: {
                    team_id,
                    school_id,
                    schoolName,
                    teamContesters,
                    individualContesters,
                  },
                  showModal: true,
                  preShowModal: true,
                })
              }
              key={team.team_id}
            />
          ))
        ) : (
          <h2 className={styles.empty}>Brak drużyn</h2>
        )}
      </section>
      <section
        className={cx(styles.section, {
          [styles['section__active']]: teamsState.preShowModal,
        })}
      >
        {teamsState.showModal && (
          <NewModal
            setShowModal={(value) =>
              setTeamsState({ showModal: value, edit: {} })
            }
            preShowModal={teamsState.preShowModal}
            setPreShowModal={(value) =>
              setTeamsState({ preShowModal: value, isFocused: false })
            }
            headline={
              teamsState.edit?.team_id
                ? 'Edytowanie drużyny'
                : 'Dodawanie drużyny'
            }
            inTimeMs={250}
            outTimeMs={150}
            width={600}
          >
            <Formik
              initialValues={formInitialValues}
              validate={handleValidate}
              validateOnBlur={true}
              onSubmit={
                teamsState.edit?.team_id ? handleUpdate : handleSubmitAdd
              }
            >
              {({
                values,
                errors,
                touched,

                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                setValues,
                setFieldTouched,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  className={modalStyles.modalContent}
                >
                  <div
                    className={cx(
                      modalStyles['modalContent--field'],
                      modalStyles['modalContent--field__school'],
                    )}
                  >
                    <SelectWithHeading
                      heading={'Wybierz szkołę'}
                      status={touched.school && errors.school?.status}
                      statusMessage={errors.school?.message}
                    >
                      <Select
                        placeholder={'Szkoła'}
                        height={50}
                        options={schools
                          .filter(
                            (school) =>
                              !teams?.find(
                                (team) => team.school_id === school.school_id,
                              ),
                          )
                          .map(({ school_id, name }) => ({
                            value: school_id,
                            label: name,
                          }))}
                        isSearchable={true}
                        backgroundColor={'#222131'}
                        value={values.school}
                        onChange={(value) =>
                          setValues({
                            school: value,
                            individuals: null,
                            team: null,
                          })
                        }
                        setIsFocused={() => setTeamsState({ isFocused: true })}
                        focusOnMount
                        setTouched={() => setFieldTouched('school', true)}
                        isDisabled={teamsState.edit?.team_id}
                      />
                    </SelectWithHeading>
                  </div>

                  <div
                    className={cx(
                      modalStyles['modalContent--field'],
                      modalStyles['modalContent--field__team'],
                    )}
                  >
                    <SelectWithHeading
                      heading={'Wybierz 6 strzelców do drużyny'}
                      status={touched.team && errors.team?.status}
                      statusMessage={errors.team?.message}
                    >
                      <Select
                        value={values.team}
                        placeholder={'Wybierz strzelca'}
                        onChange={(value) => setFieldValue('team', value)}
                        setTouched={() => setFieldTouched('team', true)}
                        isSearchable={true}
                        isDisabled={!values.school}
                        options={
                          values.school &&
                          shooters
                            .filter(
                              (shooter) =>
                                (shooter.school_id === values.school.value ||
                                  shooter.second_school_id ===
                                    values.school.value) &&
                                !values.individuals?.find(
                                  ({ value }) => value === shooter.shooter_id,
                                ),
                            )
                            .map((shooter) => ({
                              label: `${shooter.firstName} ${shooter.secondName}`,
                              value: shooter.shooter_id,
                            }))
                        }
                        height={'auto'}
                        isMulti={true}
                        limitOfOptions={6}
                        backgroundColor={'#222131'}
                      />
                    </SelectWithHeading>
                  </div>
                  <div
                    className={cx(
                      modalStyles['modalContent--field'],
                      modalStyles['modalContent--field__individual'],
                    )}
                  >
                    <SelectWithHeading
                      heading={'Wybierz strzelców indywidualnych'}
                    >
                      <Select
                        value={values.individuals}
                        placeholder={'Wybierz strzelca'}
                        onChange={(value) =>
                          setFieldValue('individuals', value)
                        }
                        setTouched={() => setFieldTouched('individuals', true)}
                        isDisabled={!values.school}
                        options={
                          values.school &&
                          shooters
                            .filter(
                              (shooter) =>
                                (shooter.school_id === values.school.value ||
                                  shooter.second_school_id ===
                                    values.school.value) &&
                                !values.team?.find(
                                  ({ value }) => value === shooter.shooter_id,
                                ),
                            )
                            .map((shooter) => ({
                              label: `${shooter.firstName} ${shooter.secondName}`,
                              value: shooter.shooter_id,
                            }))
                        }
                        height={'auto'}
                        isMulti={true}
                        backgroundColor={'#222131'}
                      />
                    </SelectWithHeading>
                  </div>

                  <DefaultButton
                    text={teamsState.edit?.team_id ? 'Aktualizuj' : 'Dodaj'}
                    type={'submit'}
                    isLoading={isSubmitting}
                    disabled={
                      isSubmitting ||
                      !values.team ||
                      (teamsState.edit?.team_id
                        ? false
                        : Object.values(errors).length > 0 ||
                          Object.values(touched).length === 0)
                    }
                  />
                </form>
              )}
            </Formik>
          </NewModal>
        )}
      </section>
    </div>
  );
}
