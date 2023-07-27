import React, { useEffect, useReducer, useState } from 'react';
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
import Select from '../../../components/select/Select';
import SelectWithHeading from '../../../components/select/SelectWithHeading';

export default function ShootersPage() {
  const [shootersState, setShootersState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      isLoading: true,
      showModal: false,
      preShowModal: false,
      shooters: [],
      editId: undefined,
      currentSchool: undefined, //get grom url if exist
    },
  );

  const getGender = (name) => {
    const isMan = { value: 1, label: 'Mężczyzna' };
    const isWoman = { value: 0, label: 'Kobieta' };

    const phrase = name.replace(/\//g, '\\/');
    const regex = new RegExp(phrase, 'i');
    if (regex.test('kuba')) {
      return isMan;
    }
    console.log(name.charAt(name.length - 1) === 'a' ? isWoman : isMan);
    // Check if the last character of the name is 'a'
    return name.charAt(name.length - 1) === 'a' ? isWoman : isMan;
  };
  const getSchool = (id) => {
    return { value: id, label: 'Maricn' }; //todo We need to get it from context
  };
  const currentShooter =
    shootersState.editId &&
    shootersState.shooters.find((i) => i.id === shootersState.editId);

  const formInitialValues = {
    firstName: currentShooter ? currentShooter.firstName : '',
    secondName: currentShooter ? currentShooter.secondName : '',
    gender: currentShooter && getGender(currentShooter.firstName),
    schoolId: currentShooter
      ? getSchool(currentShooter.schoolId)
      : shootersState.currentSchool,
  };
  const handleValidate = (values) => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = {
        status: 'warning',
        message: 'Imię jest wymagane',
      };
    } else if (values.firstName.trim().length === 0) {
      errors.firstName = {
        status: 'warning',
        message: 'Imię nie może być puste',
      };
    }

    if (!values.secondName) {
      errors.secondName = {
        status: 'warning',
        message: 'Nazwisko jest wymagane',
      };
    } else if (values.secondName.trim().length === 0) {
      errors.secondName = {
        status: 'warning',
        message: 'Nazwisko nie może być puste',
      };
    }

    if (!values.gender) {
      errors.gender = {
        status: 'warning',
        message: 'Wybierz płeć',
      };
    }

    if (!values.schoolId) {
      errors.schoolId = {
        status: 'warning',
        message: 'Wybierz szkołę',
      };
    }
    return errors;
  };
  const handleSubmitAdd = async (values, { setSubmitting }) => {
    const newShooters = [...shootersState.shooters];
    const id = uuidv4();
    newShooters.push({
      id: id,
      firstName: values.firstName,
      secondName: values.secondName,
      isMan: values.gender.value,
      schoolId: values.schoolId.value,
      index: newShooters.length + 1,
    });

    await new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('backend...💭💭💭');
        resolve();
      }, 1500);
    });
    //!we need to make api callback and put school database
    //! if it returns some error we stop executing code here
    //!and error is displayed in notification

    setShootersState({
      shooters: newShooters,
      showModal: false,
      preShowModal: false,
    });
    setSubmitting(false);
  };
  const handleSubmitUpdate = async (values, { setSubmitting }) => {
    const newShooters = [...shootersState.shooters].map((i) => {
      if (i.id === shootersState.editId) {
        i.firstName = values.firstName;
        i.secondtName = values.secondName;
        i.isMan = values.gender.value;
        i.schoolId = values.schoolId.value;
      }

      return i;
    });

    await new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('backend...💭💭💭');
        resolve();
      }, 1500);
    });
    // //!we need to make api callback and put school database
    // //! if it returns some error we stop executing code here
    // //!and error is displayed in notification

    setShootersState({
      shooters: newShooters,
      showModal: false,
      preShowModal: false,
      editId: undefined,
    });
    setSubmitting(false);
  };

  useEffect(() => {
    const fetchSchools = async () => {
      await new Promise((res, req) => setTimeout(() => res(), 2000));

      let fetchedData = [
        {
          id: 1,
          firstName: 'Emilia',
          secondName: 'Nowak',
          schoolId: 1,
          isMan: false,
        },
        {
          id: 2,
          firstName: 'Marcin',
          secondName: 'Najman',
          schoolId: 2,
          isMan: true,
        },
        {
          id: 3,
          firstName: 'Olivia',
          secondName: 'Wiśniewska',
          schoolId: 1,
          isMan: false,
        },
        {
          id: 4,
          firstName: 'Marcin',
          secondName: 'Wrzosek',
          schoolId: 3,
          isMan: true,
        },
        {
          id: 5,
          firstName: 'Zuzanna',
          secondName: 'Jankowska',
          schoolId: 4,
          isMan: false,
        },
        {
          id: 6,
          firstName: 'Filip',
          secondName: 'Dąbrowski',
          schoolId: 5,
          isMan: true,
        },
        {
          id: 7,
          firstName: 'Natalia',
          secondName: 'Woźniak',
          schoolId: 345,
          isMan: 3,
        },
      ];

      //Below the ordinal number is applied
      fetchedData = fetchedData.map((item, index) => {
        item.index = index + 1;
        return item;
      });

      setShootersState({
        isLoading: false,
        shooters: fetchedData,
      });
    };

    fetchSchools();
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
              setShootersState({ showModal: true, preShowModal: true })
            }
          />
        </header>
        <section
          className={cx(styles.section, {
            [styles['section__active']]: shootersState.preShowModal,
          })}
        >
          <ElementsList
            isLoading={shootersState.isLoading}
            data={shootersState.shooters}
            setData={(data) => setShootersState({ schooters: data })}
            setIsEditing={(value) =>
              setShootersState({
                editId: value,
                showModal: true,
                preShowModal: true,
              })
            }
            currentSchool={shootersState.currentSchool}
            setCurrentSchool={(value) => {
              setShootersState({ currentSchool: value });
            }}
          />

          {shootersState.showModal && (
            <NewModal
              setShowModal={(value) =>
                setShootersState({ showModal: value, editId: undefined })
              }
              setPreShowModal={(value) =>
                setShootersState({ preShowModal: value })
              }
              headline={
                shootersState.editId === undefined
                  ? 'Dodaj strzelca'
                  : 'Zmień dane'
              }
              inTimeMs={250}
              outTimeMs={150}
              width={500}
            >
              <Formik
                initialValues={formInitialValues}
                validate={handleValidate}
                onSubmit={
                  shootersState.editId === undefined
                    ? handleSubmitAdd
                    : handleSubmitUpdate
                }
                validateOnMount={shootersState.editId != undefined}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  setFieldValue,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
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
                        status={touched.gender && errors.gender?.status}
                        statusMessage={errors.gender?.message}
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
                          value={values.gender}
                          onChange={(value) => setFieldValue('gender', value)}
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
                        status={touched.schoolId && errors.schoolId?.status}
                        statusMessage={errors.schoolId?.message}
                      >
                        <Select
                          placeholder={'Szkoła'}
                          height={50}
                          options={[
                            { value: 1, label: 'Szkoła Podstawowa nr 1' }, //value is of course id of school
                            {
                              value: 2,
                              label: 'Gimnazjum im. Jana Kowalskiego',
                            },
                            { value: 3, label: 'Liceum Ogólnokształcące nr 5' },
                            {
                              value: 4,
                              label: 'Szkoła Artystyczna dla Młodych Talentów',
                            },
                            {
                              value: 5,
                              label:
                                'Technikum Elektryczne im. Marii Skłodowskiej-Curie',
                            },
                            { value: 6, label: 'Szkoła Podstawowa nr 3' },
                          ]}
                          isSearchable={true}
                          backgroundColor={'#222131'}
                          value={values.schoolId}
                          onChange={(value) => setFieldValue('schoolId', value)}
                        />
                      </SelectWithHeading>
                    </div>
                    <DefaultButton
                      text={
                        shootersState.editId === undefined
                          ? 'Dodaj strzelca'
                          : 'Akualizuj dane'
                      }
                      type={'submit'}
                      isLoading={isSubmitting}
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
