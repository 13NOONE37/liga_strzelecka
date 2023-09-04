import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
} from 'react';
import cx from 'classnames';
import { Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import DefaultButton from '../../../components/button/Button';
import { ReactComponent as AddIcon } from '../../../assets/icons/add.svg';

import ElementsList from './elementsList/ElementsList';
import styles from '../schools/SchoolsPage.module.css';
import contestsStyle from './ContestsPage.module.css';

import NewModal from '../../../components/modal/RTUComponents/newModal/NewModal';
import Input from '../../../components/input/Input';
import AnimatedPage from '../../../components/animatedPage/AnimatedPage';
import DataContext from '../../../store/DataContext';
import fetchData from '../../../utils/fetchData';
import { toast } from 'react-toastify';
import Select from '../../../components/select/Select';
import SelectWithHeading from '../../../components/select/SelectWithHeading';
import Calendar from '../../../components/Calendar/Calendar';
import { Route } from 'react-router-dom';
export default function ContestsPage() {
  const { schools, contests, setContests } = useContext(DataContext);
  const [contestsState, setContestsState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      showModal: false,
      preShowModal: false,
      editId: undefined,
      isFocused: false,
      seasons: null,
      currentSeason: null,
    },
  );

  const currentContest =
    contestsState.editId !== undefined
      ? contests.find((i) => i.contest_id === contestsState.editId)
      : null;
  const date = new Date();
  const currentDate = currentContest && currentContest.date.split('-');

  const formInitialValues = {
    year: currentDate ? Number(currentDate[0]) : date.getFullYear(),
    month: currentDate ? Number(currentDate[1]) - 1 : date.getMonth(),
    day: currentDate ? Number(currentDate[2]) : date.getDate(),
    school: currentContest
      ? {
          value: currentContest.location,
          label: schools.find(
            (school) => school.school_id === currentContest.location,
          ).name,
        }
      : null,
  };

  const handleValidate = (values) => {
    const errors = {};
    if (!contestsState.isFocused) return errors;
    if (!values.school) {
      errors.school = {
        status: 'warning',
        message: 'Szkoła jest wymagana',
      };
    }
    return errors;
  };
  const handleSubmitAdd = async (
    values,
    { setSubmitting, setErrors, resetForm },
  ) => {
    try {
      const contestDate = [
        values.year,
        (values.month + 1).toString().padStart(2, '0'),
        values.day.toString().padStart(2, '0'),
      ].join('-');

      const newContests = [...contests];
      const id = uuidv4();
      newContests.push({
        contest_id: id,
        location: values.school.value,
        date: contestDate,
        index: newContests.length + 1,
        visible: true,
        checked: false,
      });

      const { status } = await fetchData({
        action: 'createContest',
        contest_id: id,
        location: values.school.value,
        date: contestDate,
      });

      //Only if fetch is success✅
      if (status === 200) {
        setContestsState({
          preShowModal: false,
        });
        setContests(newContests);
        getAndApplySeasons(newContests);
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
      const contestDate = [
        values.year,
        (values.month + 1).toString().padStart(2, '0'),
        values.day.toString().padStart(2, '0'),
      ].join('-');
      const { status } = await fetchData({
        action: 'updateContest',
        contest_id: contestsState.editId,
        location: values.school.value,
        date: contestDate,
      });

      //Only if fetch is success✅
      if (status === 200) {
        setContestsState({
          preShowModal: false,
        });

        const newContests = contests.map((item) => {
          if (item.contest_id === contestsState.editId) {
            return {
              ...item,
              location: values.school.value,
              date: contestDate,
            };
          }
          return item;
        });
        setContests(newContests);
        getAndApplySeasons(newContests);
        resetForm();
      }
    } catch (error) {
      toast.error('Coś poszło nie tak. Spróbuj ponownie.', { autoClose: 5000 });
    }

    setSubmitting(false);
  };
  const getAndApplySeasons = (contests) => {
    const years = [];
    const ranges = [];

    const data = contests.sort((a, b) => new Date(a.date) - new Date(b.date));
    // const data = contests.sort((a, b) => +new Date(a.date) - +new Date(b.date));

    if (new Date(data[0].date).getMonth() + 1 <= 8) {
      years.push(new Date(data[0].date).getFullYear() - 1);
    } else {
      years.push(new Date(data[0].date).getFullYear());
    }
    if (new Date(data[data.length - 1].date).getMonth() + 1 >= 9) {
      years.push(new Date(data[data.length - 1].date).getFullYear() + 1);
    } else {
      years.push(new Date(data[data.length - 1].date).getFullYear());
    }
    for (years[0]; years[0] < years[1]; years[0]++) {
      ranges.push({
        label: `${years[0]}/${(years[0] + 1).toString().slice(2)}`,
        value: [
          new Date(years[0], 8, 1).getTime(),
          new Date(years[0] + 1, 7, 31).getTime(),
        ],
      });
    }
    ranges.reverse();
    setContestsState({ seasons: ranges });
  };

  useLayoutEffect(() => {
    //Reset visibility and checkmark to default
    getAndApplySeasons(contests);
    return () =>
      setContests((prev) =>
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
          <h1>Lista zawodów</h1>
          <DefaultButton
            text={'Dodaj'}
            icon={<AddIcon />}
            size={'medium'}
            iconPosition={'right'}
            action={() =>
              setContestsState({ showModal: true, preShowModal: true })
            }
          />
        </header>
        <section
          className={cx(styles.section, {
            [contestsStyle['section__active']]: contestsState.preShowModal,
          })}
        >
          <ElementsList
            currentSeason={contestsState.currentSeason}
            setCurrentSeason={(value) =>
              setContestsState({ currentSeason: value })
            }
            seasons={contestsState.seasons}
            setIsEditing={(value) =>
              setContestsState({
                editId: value,
                showModal: true,
                preShowModal: true,
              })
            }
          />

          {contestsState.showModal && (
            <NewModal
              setShowModal={(value) =>
                setContestsState({
                  showModal: value,
                  editId: undefined,
                })
              }
              preShowModal={contestsState.preShowModal}
              setPreShowModal={(value) =>
                setContestsState({ preShowModal: value, isFocused: false })
              }
              headline={
                contestsState.editId === undefined
                  ? 'Dodaj zawody'
                  : 'Zmień informacje'
              }
              inTimeMs={250}
              outTimeMs={150}
              width={420}
            >
              <Formik
                initialValues={formInitialValues}
                validate={handleValidate}
                validateOnBlur={true}
                onSubmit={
                  contestsState.editId === undefined
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
                  <form
                    onSubmit={handleSubmit}
                    className={contestsStyle.modalContent}
                  >
                    <div
                      className={cx(
                        styles['modalContent--field'],
                        contestsStyle['modalContent--field__school'],
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
                            setContestsState({ isFocused: true })
                          }
                          setTouched={() => setFieldTouched('school', true)}
                        />
                      </SelectWithHeading>
                    </div>
                    <div
                      className={cx(
                        styles['modalContent--field'],
                        contestsStyle['modalContent--field__date'],
                      )}
                    >
                      <Calendar
                        initRenderYear={values.year}
                        initRenderMonth={values.month}
                        selectedYear={values.year}
                        selectedMonth={values.month}
                        selectedDay={values.day}
                        setDate={(year, month, day) => {
                          setFieldValue('year', year);
                          setFieldValue('month', month),
                            setFieldValue('day', day);
                        }}
                      />
                    </div>

                    <DefaultButton
                      text={
                        contestsState.editId === undefined
                          ? 'Dodaj'
                          : 'Akualizuj'
                      }
                      type={'submit'}
                      isLoading={isSubmitting}
                      disabled={isSubmitting || !values.school}
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
