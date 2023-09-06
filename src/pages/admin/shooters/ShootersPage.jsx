import React, { useContext, useEffect, useReducer } from 'react';
import cx from 'classnames';
import { Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import DefaultButton from '../../../components/button/Button';
import { ReactComponent as AddIcon } from '../../../assets/icons/add.svg';

import ElementsList from './elementsList/ElementsList';
import styles from './ShootersPage.module.css';
import NewModal from '../../../components/modal/RTUComponents/newModal/NewModal';
import Input from '../../../components/input/Input';
import AnimatedPage from '../../../components/animatedPage/AnimatedPage';
import DataContext from '../../../store/DataContext';
import fetchData from '../../../utils/fetchData';
import SelectWithHeading from '../../../components/select/SelectWithHeading';
import Select from '../../../components/select/Select';
import { toast } from 'react-toastify';

export default function ShootersPage() {
  const { schools, shooters, setShooters } = useContext(DataContext);
  const [shooterState, setShooterState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      showModal: false,
      preShowModal: false,
      editId: undefined,
      isFocused: false,
      currentSchool: { value: null, label: 'Wszystkie' },
      currentGender: { value: null, label: 'Obie' }, //1-man, 0-woman,null both
    },
  );
  const currentShooter = shooters.find(
    (shooter) => shooter.shooter_id === shooterState.editId,
  );

  const formInitialValues = {
    firstName: currentShooter ? currentShooter.firstName : '',
    secondName: currentShooter ? currentShooter.secondName : '',
    isMan: currentShooter
      ? {
          value: currentShooter.isMan,
          label: currentShooter.isMan ? 'Mężczyzna' : 'Kobieta',
        }
      : typeof shooterState.currentGender.value === 'number'
      ? shooterState.currentGender
      : null,
    school: currentShooter
      ? {
          value: currentShooter.school_id,
          label: schools.find(
            (school) => school.school_id === currentShooter.school_id,
          ).name,
        }
      : shooterState.currentSchool.value
      ? shooterState.currentSchool
      : null,
  };

  const handleValidate = (values) => {
    const errors = {};
    if (!shooterState.isFocused) return errors;

    if (!values.firstName.trim()) {
      errors.firstName = {
        status: 'warning',
        message: 'Imie jest wymagane',
      };
    }
    if (!values.secondName.trim()) {
      errors.secondName = {
        status: 'warning',
        message: 'Nazwisko jest wymagane',
      };
    }
    if (!values.school?.value) {
      errors.school = {
        status: 'warning',
        message: 'Szkoła jest wymagana',
      };
    }

    if (values.isMan?.value === null) {
      errors.isMan = {
        status: 'warning',
        message: 'Płeć jest wymagana',
      };
    }
    return errors;
  };
  const handleSubmitAdd = async (values, { setSubmitting, resetForm }) => {
    try {
      const newShooters = [...shooters];
      const id = uuidv4();
      newShooters.push({
        shooter_id: id,
        school_id: values.school.value,
        firstName: values.firstName,
        secondName: values.secondName,
        isMan: values.isMan.value,
        index: newShooters.length + 1,
        visible: true,
        checked: false,
      });

      const { status } = await fetchData({
        action: 'createShooter',
        shooter_id: id,
        school_id: values.school.value,
        firstName: values.firstName,
        secondName: values.secondName,
        isMan: values.isMan.value,
      });

      //Only if fetch is success✅
      if (status === 200) {
        setShooterState({
          preShowModal: false,
        });
        setShooters(newShooters);
        resetForm();
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
  const handleSubmitUpdate = async (values, { setSubmitting, resetForm }) => {
    try {
      const { status } = await fetchData({
        action: 'updateShooter',
        shooter_id: shooterState.editId,
        school_id: values.school.value,
        firstName: values.firstName,
        secondName: values.secondName,
        isMan: values.isMan.value,
      });

      //Only if fetch is success✅
      if (status === 200) {
        setShooterState({
          preShowModal: false,
        });
        setShooters((prev) =>
          prev.map((item) => {
            if (item.shooter_id === shooterState.editId) {
              return {
                ...item,
                school_id: values.school.value,
                firstName: values.firstName,
                secondName: values.secondName,
                isMan: values.isMan.value,
              };
            }
            return item;
          }),
        );
        resetForm();
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
  const handleArchiveShooter = async (id) => {
    try {
      const { status } = await fetchData({
        action: 'updateShooter',
        shooter_id: id,
        isArchived: 1,
      });
      //Only if fetch is success✅
      if (status === 200) {
        setShooters((prev) =>
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
    //Reset visibility and checkmark to default
    return () =>
      setShooters((prev) =>
        prev.map((item) => ({
          ...item,
          visible: true,
          checked: false,
        })),
      );
  }, []);

  return (
    <AnimatedPage>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Lista strzelców</h1>
          <DefaultButton
            text={'Dodaj'}
            icon={<AddIcon />}
            size={'medium'}
            iconPosition={'right'}
            action={() =>
              setShooterState({ showModal: true, preShowModal: true })
            }
          />
        </header>
        <section
          className={cx(styles.section, {
            [styles['section__active']]: shooterState.preShowModal,
          })}
        >
          <ElementsList
            setIsEditing={(value) =>
              setShooterState({
                editId: value,
                showModal: true,
                preShowModal: true,
              })
            }
            handleArchive={handleArchiveShooter}
            currentSchool={shooterState.currentSchool}
            setCurrentSchool={(value) =>
              setShooterState({ currentSchool: value })
            }
            currentGender={shooterState.currentGender}
            setCurrentGender={(value) =>
              setShooterState({ currentGender: value })
            }
          />

          {shooterState.showModal && (
            <NewModal
              setShowModal={(value) =>
                setShooterState({
                  showModal: value,
                  editId: undefined,
                })
              }
              preShowModal={shooterState.preShowModal}
              setPreShowModal={(value) =>
                setShooterState({ preShowModal: value, isFocused: false })
              }
              headline={
                shooterState.editId === undefined
                  ? 'Dodaj strzelca'
                  : 'Zmień dane'
              }
              inTimeMs={250}
              outTimeMs={150}
              width={480}
            >
              <Formik
                initialValues={formInitialValues}
                validate={handleValidate}
                validateOnBlur={true}
                onSubmit={
                  shooterState.editId === undefined
                    ? handleSubmitAdd
                    : handleSubmitUpdate
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
                  setFieldTouched,
                }) => (
                  <form onSubmit={handleSubmit} className={styles.modalContent}>
                    <div
                      className={cx(
                        styles['modalContent--field'],
                        styles['modalContent--field__firstName'],
                      )}
                    >
                      <Input
                        heading={'Podaj imię'}
                        placeholder={'Imię'}
                        value={values.firstName}
                        name={'firstName'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        status={touched.firstName && errors.firstName?.status}
                        statusMessage={errors.firstName?.message}
                        autoComplete={'off'}
                        focusOnMount
                        setIsFocused={() =>
                          setShooterState({ isFocused: true })
                        }
                      />
                    </div>
                    <div
                      className={cx(
                        styles['modalContent--field'],
                        styles['modalContent--field__secondName'],
                      )}
                    >
                      <Input
                        heading={'Podaj nazwisko'}
                        placeholder={'Nazwisko'}
                        value={values.secondName}
                        name={'secondName'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        status={touched.secondName && errors.secondName?.status}
                        statusMessage={errors.secondName?.message}
                        autoComplete={'off'}
                        setIsFocused={() =>
                          setShooterState({ isFocused: true })
                        }
                      />
                    </div>

                    <div
                      className={cx(
                        styles['modalContent--field'],
                        styles['modalContent--field__gender'],
                      )}
                    >
                      <SelectWithHeading
                        heading={'Wybierz płeć'}
                        status={touched.isMan && errors.isMan?.status}
                        statusMessage={errors.isMan?.message}
                      >
                        <Select
                          options={[
                            { label: 'Kobieta', value: 0 },
                            { label: 'Mężczyzna', value: 1 },
                          ]}
                          placeholder={'Płeć'}
                          isSearchable={false}
                          height={50}
                          backgroundColor={'#222131'}
                          value={values.isMan}
                          onChange={(value) => setFieldValue('isMan', value)}
                          setIsFocused={() =>
                            setShooterState({ isFocused: true })
                          }
                          setTouched={() => setFieldTouched('isMan', true)}
                        />
                      </SelectWithHeading>
                    </div>
                    <div
                      className={cx(
                        styles['modalContent--field'],
                        styles['modalContent--field__school'],
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
                          options={schools.map(({ school_id, name }) => ({
                            value: school_id,
                            label: name,
                          }))}
                          isSearchable={true}
                          backgroundColor={'#222131'}
                          value={values.school}
                          onChange={(value) => setFieldValue('school', value)}
                          setIsFocused={() =>
                            setShooterState({ isFocused: true })
                          }
                          setTouched={() => setFieldTouched('school', true)}
                        />
                      </SelectWithHeading>
                    </div>
                    <DefaultButton
                      text={
                        shooterState.editId === undefined
                          ? 'Dodaj'
                          : 'Akualizuj'
                      }
                      type={'submit'}
                      isLoading={isSubmitting}
                      disabled={
                        isSubmitting ||
                        Object.values(errors).length > 0 ||
                        Object.values(touched).length === 0
                      }
                    />
                  </form>
                )}
              </Formik>
            </NewModal>
          )}
        </section>
      </div>
    </AnimatedPage>
  );
}
