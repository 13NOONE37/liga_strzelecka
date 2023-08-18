import React, { useContext, useEffect, useReducer } from 'react';
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
import DataContext from '../../../store/DataContext';
import fetchData from '../../../utils/fetchData';
import { toast } from 'react-toastify';

export default function SchoolsPage() {
  const { schools, setSchools } = useContext(DataContext);
  const [schoolState, setSchoolState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      showModal: false,
      preShowModal: false,
      editId: undefined,
      isFocused: false,
    },
  );
  const formInitialValues = {
    name:
      schoolState.editId === undefined
        ? ''
        : schools.find((i) => i.school_id === schoolState.editId).name,
  };

  const handleValidate = (values) => {
    const errors = {};
    if (!schoolState.isFocused) return errors;
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
    } else if (schools.find((i) => i.name.trim() === values.name.trim())) {
      errors.name = {
        status: 'warning',
        message: 'Taka szkoła już istnieje',
      };
    }
    return errors;
  };
  const handleSubmitAdd = async (
    values,
    { setSubmitting, setErrors, resetForm },
  ) => {
    try {
      const newSchools = [...schools];
      const id = uuidv4();
      newSchools.push({
        school_id: id,
        name: values.name,
        index: newSchools.length + 1,
        visible: true,
        checked: false,
      });

      const { status } = await fetchData({
        action: 'createSchool',
        school_id: id,
        name: values.name,
      });

      //Only if fetch is success✅
      if (status === 200) {
        setSchoolState({
          preShowModal: false,
        });
        setSchools(newSchools);
        resetForm();
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrors({
          name: {
            status: 'error',
            message: 'Taka szkoła już istnieje',
          },
        });
      } else {
        toast.error('Coś poszło nie tak. Spróbuj ponownie.', {
          autoClose: 4000,
          closeButton: false,
          pauseOnHover: false,
        });
      }
    }

    setSubmitting(false);
  };
  const handleSubmitUpdate = async (values, { setSubmitting, resetForm }) => {
    try {
      const { status } = await fetchData({
        action: 'updateSchool',
        school_id: schoolState.editId,
        name: values.name,
      });

      //Only if fetch is success✅
      if (status === 200) {
        setSchoolState({
          preShowModal: false,
        });
        setSchools((prev) =>
          prev.map((item) => {
            if (item.school_id === schoolState.editId) {
              return {
                ...item,
                name: values.name,
              };
            }
            return item;
          }),
        );
        resetForm();
      }
    } catch (error) {
      toast.error('Coś poszło nie tak. Spróbuj ponownie.', { autoClose: 5000 });
    }

    setSubmitting(false);
  };

  useEffect(() => {
    //Reset visibility and checkmark to default
    return () =>
      setSchools((prev) =>
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
              preShowModal={schoolState.preShowModal}
              setPreShowModal={(value) =>
                setSchoolState({ preShowModal: value, isFocused: false })
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
                validateOnMount={schoolState.editId}
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
                        focusOnMount
                        setIsFocused={() => setSchoolState({ isFocused: true })}
                      />
                    </div>
                    <DefaultButton
                      text={
                        schoolState.editId === undefined ? 'Dodaj' : 'Akualizuj'
                      }
                      type={'submit'}
                      isLoading={isSubmitting}
                      disabled={
                        errors.name || values.name.length === 0 || isSubmitting
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
