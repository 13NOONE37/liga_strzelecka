import React, { useContext, useEffect, useReducer, useState } from 'react';
import cx from 'classnames';
import { Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import DefaultButton from '../../../components/button/Button';
import { ReactComponent as AddIcon } from '../../../assets/icons/add.svg';

import ElementsList from './elementsList/ElementsList';
import styles from './SchoolsPage.module.css';
import NewModal from '../../../components/modal/RTUComponents/newModal/NewModal';
import Input from '../../../components/input/Input';
import AnimatedPage from '../../../components/animatedPage/AnimatedPage';
import GlobalContext from '../../../store/GlobalContext';
import axios from 'axios';

export default function SchoolsPage() {
  const { schools, setSchools } = useContext(GlobalContext);

  //!!todo trzeba zabezpieczyć usuwanie szkół komunikatem w przypadku gdy do danej szkoły są przypisanie uczniowie
  //!!todo np. aby usunąć szkołę należy wpierw usunąć przypisanych uczniów

  const [schoolState, setSchoolState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      isLoading: true,
      showModal: false,
      preShowModal: false,
      schools: [],
      editId: undefined,
    },
  );

  const formInitialValues = {
    name:
      schoolState.editId === undefined
        ? ''
        : schoolState.schools.find((i) => i.id === schoolState.editId).name,
  };
  const handleValidate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = {
        status: 'warning',
        message: 'Nazwa jest wymagana',
      };
    } else if (values.name.trim().length === 0) {
      errors.name = {
        status: 'warning',
        message: 'Nazwa nie może być pusta',
      };
    } else if (schoolState.schools.find((i) => i.name === values.name)) {
      errors.name = {
        status: 'warning',
        message: 'Taka szkoła już istnieje',
      };
    }
    return errors;
  };
  const handleSubmitAdd = async (values, { setSubmitting }) => {
    const newSchools = [...schoolState.schools];
    const id = uuidv4();
    newSchools.push({
      id: id,
      name: values.name,
      index: newSchools.length + 1,
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

    setSchoolState({
      schools: newSchools,
      showModal: false,
      preShowModal: false,
    });
    setSubmitting(false);
  };
  const handleSubmitUpdate = async (values, { setSubmitting }) => {
    const newSchools = [...schoolState.schools].map((i) => {
      if (i.id === schoolState.editId) {
        i.name = values.name;
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

    setSchoolState({
      schools: newSchools,
      showModal: false,
      preShowModal: false,
      editId: undefined,
    });
    setSubmitting(false);
  };

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const data = await axios.post(
          'http://localhost/liga_strzelecka/api.php',
          {
            action: 'getSchools',
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        data.map((item, index) => {
          console.log(item, index);
        });
      } catch (error) {
        console.log(error);
      }
      // await new Promise((res, req) => setTimeout(() => res(), 2000));

      // //todo check error

      // let fetchedData = [
      //   { id: 1, name: 'Szkoła Podstawowa nr 1' },
      //   { id: 2, name: 'Gimnazjum im. Jana Kowalskiego' },
      //   { id: 3, name: 'Liceum Ogólnokształcące nr 5' },
      //   { id: 4, name: 'Szkoła Artystyczna dla Młodych Talentów' },
      //   { id: 5, name: 'Technikum Elektryczne im. Marii Skłodowskiej-Curie' },
      //   { id: 6, name: 'Szkoła Podstawowa nr 3' },
      // ];

      // //Below the ordinal number is applied
      // fetchedData = fetchedData.map((item, index) => {
      //   item.index = index + 1;
      //   return item;
      // });

      // setSchools(fetchedData);
      // setSchoolState({
      //   isLoading: false,
      // });
    };

    if (schools === null) {
      fetchSchools();
    } else {
      setSchoolState({ isLoading: false });
    }
  }, []);

  return (
    <AnimatedPage>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Lista szkół</h1>
          <DefaultButton
            text={'Dodaj'}
            icon={<AddIcon />}
            size={'medium'}
            iconPosition={'right'}
            action={() =>
              setSchoolState({ showModal: true, preShowModal: true })
            }
          />
        </header>
        <section
          className={cx(styles.section, {
            [styles['section__active']]: schoolState.preShowModal,
          })}
        >
          <ElementsList
            isLoading={schoolState.isLoading}
            data={schoolState.schools}
            setData={(data) => setSchoolState({ schools: data })}
            setIsEditing={(value) =>
              setSchoolState({
                editId: value,
                showModal: true,
                preShowModal: true,
              })
            }
          />

          {schoolState.showModal && (
            <NewModal
              setShowModal={(value) =>
                setSchoolState({ showModal: value, editId: undefined })
              }
              setPreShowModal={(value) =>
                setSchoolState({ preShowModal: value })
              }
              headline={
                schoolState.editId === undefined ? 'Dodaj szkołę' : 'Zmień dane'
              }
              inTimeMs={250}
              outTimeMs={150}
              width={400}
            >
              <Formik
                initialValues={formInitialValues}
                validate={handleValidate}
                onSubmit={
                  schoolState.editId === undefined
                    ? handleSubmitAdd
                    : handleSubmitUpdate
                }
                validateOnMount={schoolState.editId != undefined}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form onSubmit={handleSubmit} className={styles.modalContent}>
                    <div className={styles['modalContent--input']}>
                      <Input
                        heading={'Podaj nazwę szkoły'}
                        placeholder={'Nazwa szkoły'}
                        value={values.name}
                        name={'name'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        status={errors.name?.status}
                        statusMessage={errors.name?.message}
                      />
                    </div>
                    <DefaultButton
                      text={
                        schoolState.editId === undefined
                          ? 'Dodaj szkołę'
                          : 'Akualizuj szkołę'
                      }
                      type={'submit'}
                      isLoading={isSubmitting}
                      disabled={errors.name || values.name.length === 0}
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
