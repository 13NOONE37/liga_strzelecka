import React, {
  forwardRef,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import FlipMove from 'react-flip-move';
import cx from 'classnames';

import styles from '../../schools/elementsList/ElementsList.module.css';
import shootersStyles from './ElementsList.module.css';
import { ReactComponent as MoreIcon } from '../../../../assets/icons/more.svg';
import { ReactComponent as DeleteIcon } from '../../../../assets/icons/delete.svg';
import { ReactComponent as EditIcon } from '../../../../assets/icons/edit.svg';
import { ReactComponent as DropDownIcon } from '../../../../assets/icons/arrow_drop_down.svg';

import Checkbox from '../../../../components/checkbox/Checkbox';
import DefaultButton, {
  IconButton,
} from '../../../../components/button/Button';
import filterArrayOfObjects from '../../../../utils/filterArrayOfObjects';
import ConfirmModal from '../../../../components/modal/RTUComponents/ConfirmModal/ConfirmModal';
import ContextMenu from '../../../../components/contextMenu/ContextMenu';
import fetchData from '../../../../utils/fetchData';
import { toast } from 'react-toastify';
import SearchInput from '../../../../components/input/RTUComponents/SearchInput';
import Select from '../../../../components/select/Select';
import DataContext from '../../../../store/DataContext';
import SelectWithHeading from '../../../../components/select/SelectWithHeading';
import getVisiblityInfo from '../../../../utils/getVisiblityInfo';

export default function ElementsList({
  setIsEditing,
  currentSchool,
  setCurrentSchool,
  currentGender,
  setCurrentGender,
}) {
  const { schools, shooters, setShooters } = useContext(DataContext);

  const [elementsState, setElementsState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      showDeleteModal: false,
      filters: {
        firstName: null, //true=asc, false=desc, null=inactive
        secondName: true,
        school_id: null,
      },
      toDeleteId: undefined,
      tempSearchPhrase: '',
      searchPhrase: '',
    },
  );
  const setFiltering = (firstNameState, secondNameState, school_idState) => {
    setElementsState({
      filters: {
        firstName: firstNameState,
        secondName: secondNameState,
        school_id: school_idState,
      },
    });
  };
  const handleCheckAll = () => {
    setShooters((prev) =>
      prev.map((item) => {
        return {
          ...item,
          checked: item.visible ? !prev.every(({ checked }) => checked) : false,
        };
      }),
    );
  };
  const handleCheckboxChange = (shooter_id) => {
    setShooters((prev) => {
      return prev.map((item) => {
        if (item.shooter_id === shooter_id) {
          return {
            ...item,
            checked: !item.checked,
          };
        }
        return item;
      });
    });
  };
  const handleSort = (shooters) => {
    // filterArrayOfObjects(shooters, 'index', 'asc');

    let currentFilter;
    for (const filter of Object.entries(elementsState.filters)) {
      if (filter[1] !== null) {
        currentFilter = filter;
        break;
      }
    }

    if (currentFilter) {
      return filterArrayOfObjects(
        shooters,
        currentFilter[0],
        currentFilter[1] ? 'desc' : 'asc',
      );
    }

    return shooters;
  };
  const handleDelete = (id) => {
    const idsToDeleteList = [];
    let idsToFilterList = [];

    if (id) {
      idsToDeleteList.push(
        fetchData({ action: 'deleteShooter', shooter_id: id }),
      );
      idsToFilterList.push(id);
    } else {
      shooters.forEach((item) => {
        if (item.checked && item.visible) {
          idsToDeleteList.push(
            fetchData({ action: 'deleteShooter', shooter_id: item.shooter_id }),
          );
          idsToFilterList.push(item.shooter_id);
        }
      });
    }

    Promise.allSettled(idsToDeleteList)
      .then((response) => {
        response.forEach((result, index) => {
          if (result.status === 'rejected') {
            toast.error(`Coś poszło nie tak. Spróbuj ponownie."`, {
              autoClose: 5000,
            });

            idsToFilterList = idsToFilterList.filter(
              (_, index2) => index !== index2,
            );
          }
        });

        setShooters((prev) =>
          prev
            .filter((item) => !idsToFilterList.includes(item.shooter_id))
            .map((item) => {
              return { ...item, checked: false };
            }),
        );

        setElementsState({
          showDeleteModal: false,
          toDeleteId: undefined,
        });
      })
      .catch((error) =>
        toast.error(`Coś poszło nie tak. Spróbuj ponownie."`, {
          autoClose: 5000,
        }),
      );
  };

  useEffect(() => {
    const phrase = elementsState.searchPhrase.trim().replace(/\//g, '\\/');
    const regex = new RegExp(phrase, 'i');

    setShooters((prev) =>
      prev.map((item) => {
        let newItem = { ...item, visible: true };
        newItem.visible =
          regex.test(item.firstName) || regex.test(item.secondName);

        if (currentSchool?.value) {
          newItem.visible =
            newItem.visible && item.school_id === currentSchool.value;
        }
        if (typeof currentGender?.value === 'number') {
          newItem.visible =
            newItem.visible && item.isMan === currentGender.value;
        }

        return newItem;
      }),
    );
  }, [elementsState.searchPhrase, currentSchool, currentGender]);

  const { isEveryHidden, isEmpty, isEveryChecked, isAnyChecked } =
    getVisiblityInfo(shooters);

  return (
    <div className={styles.container}>
      <div className={shootersStyles.searchNav}>
        <div className={shootersStyles['searchNav--select__school']}>
          <SelectWithHeading heading={'Wybierz szkołę'}>
            <Select
              placeholder={'Wybierz szkołę'}
              width={300}
              height={50}
              options={[
                { value: null, label: 'Wszystkie' },
                ...schools.map(({ school_id, name }) => ({
                  value: school_id,
                  label: name,
                })),
              ]}
              isSearchable={true}
              value={currentSchool}
              onChange={setCurrentSchool}
            />
          </SelectWithHeading>
        </div>
        <div className={shootersStyles['searchNav--select__gender']}>
          <SelectWithHeading heading={'Wybierz płeć'}>
            <Select
              placeholder={'Wybierz płeć'}
              width={300}
              height={50}
              options={[
                { value: null, label: 'Obie' },
                { value: 1, label: 'Mężczyzna' },
                { value: 0, label: 'Kobieta' },
              ]}
              isSearchable={true}
              value={currentGender}
              onChange={setCurrentGender}
            />
          </SelectWithHeading>
        </div>
        <div className={shootersStyles['searchNav--search']}>
          <SelectWithHeading heading={'ㅤ'}>
            <SearchInput
              tempValue={elementsState.tempSearchPhrase}
              onChange={(e) => {
                setElementsState({ tempSearchPhrase: e.target.value });
              }}
              setValue={(value) => setElementsState({ searchPhrase: value })}
            />
          </SelectWithHeading>
        </div>
      </div>

      <ul className={cx(styles.nav, shootersStyles.nav)}>
        <li className={styles['nav--element']}>
          <Checkbox
            checked={!isEmpty && isEveryChecked}
            onChange={handleCheckAll}
            disabled={isEmpty || isEveryHidden}
          />
        </li>
        <li
          className={cx(styles['nav--element'], {
            [styles['desc-dropdown']]: !elementsState.filters.firstName,
            [styles['asc-dropdown']]: elementsState.filters.firstName,
          })}
        >
          <DefaultButton
            style={'text'}
            size={'small'}
            icon={<DropDownIcon />}
            iconPosition={'right'}
            text={'Imię'}
            action={() => {
              setFiltering(!elementsState.filters.firstName, null, null);
            }}
            disabled={isEmpty || isEveryHidden}
          />
        </li>
        <li
          className={cx(styles['nav--element'], {
            [styles['desc-dropdown']]: !elementsState.filters.secondName,
            [styles['asc-dropdown']]: elementsState.filters.secondName,
          })}
        >
          <DefaultButton
            style={'text'}
            size={'small'}
            icon={<DropDownIcon />}
            iconPosition={'right'}
            text={'Nazwisko'}
            action={() => {
              setFiltering(null, !elementsState.filters.secondName, null);
            }}
            disabled={isEmpty || isEveryHidden}
          />
        </li>
        <li
          className={cx(styles['nav--element'], {
            [styles['desc-dropdown']]: !elementsState.filters.school_id,
            [styles['asc-dropdown']]: elementsState.filters.school_id,
          })}
        >
          <DefaultButton
            style={'text'}
            size={'small'}
            icon={<DropDownIcon />}
            iconPosition={'right'}
            text={'Szkoła'}
            action={() => {
              setFiltering(null, null, !elementsState.filters.school_id);
            }}
            disabled={isEmpty || isEveryHidden}
          />
        </li>
        <li className={styles['nav--element']}>
          <IconButton
            size={'small'}
            style={'secondary'}
            icon={<DeleteIcon />}
            action={() => {
              setElementsState({ showDeleteModal: true });
            }}
            disabled={!isAnyChecked}
          />
        </li>
      </ul>

      <FlipMove
        className={cx(styles.elements, shootersStyles.elements)}
        duration={300}
        delay={50}
      >
        {handleSort(shooters).map((props) => {
          return (
            props.visible && (
              <div
                className={cx(styles.element, shootersStyles.element)}
                key={props.shooter_id}
              >
                <SchoolComponent
                  {...props}
                  schools={schools}
                  handleCheckboxChange={handleCheckboxChange}
                  setIsEditing={setIsEditing}
                  setElementsState={setElementsState}
                />
              </div>
            )
          );
        })}
      </FlipMove>

      {elementsState.showDeleteModal && (
        <ConfirmDelete
          shooters={shooters}
          elementsState={elementsState}
          setElementsState={setElementsState}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}

const SchoolComponent = ({
  shooter_id,
  school_id,
  firstName,
  secondName,
  checked,
  schools,
  handleCheckboxChange,

  setIsEditing,
  setElementsState,
}) => {
  const buttonRef = useRef(null);
  const schoolName = schools.find(
    (school) => school.school_id === school_id,
  ).name;
  return (
    <>
      <Checkbox
        checked={checked}
        onChange={() => handleCheckboxChange(shooter_id)}
      />
      <span>{firstName}</span>
      <span>{secondName}</span>
      <span>{schoolName}</span>
      <ContextMenu
        options={[
          {
            icon: <EditIcon />,
            text: 'Edytuj',
            action: () => {
              setIsEditing(shooter_id);
            },
          },
          {
            icon: <DeleteIcon />,
            text: 'Usuń',
            action: () => {
              setElementsState({
                showDeleteModal: true,
                toDeleteId: shooter_id,
              });
            },
          },
        ]}
        ref={buttonRef}
      >
        {(setActive) => (
          <button
            className={styles['element--more']}
            onClick={setActive}
            ref={buttonRef}
          >
            <MoreIcon />
          </button>
        )}
      </ContextMenu>
    </>
  );
};

function ConfirmDelete({
  shooters,
  elementsState,
  setElementsState,
  handleDelete,
}) {
  const currentUser =
    elementsState.toDeleteId &&
    shooters.find((shooter) => shooter.shooter_id === elementsState.toDeleteId);
  return (
    <ConfirmModal
      content={
        <ul className={styles.confirmList}>
          {currentUser ? (
            <li>
              {currentUser.firstName} {currentUser.secondName}
            </li>
          ) : (
            shooters.map(
              ({ shooter_id, checked, visible, firstName, secondName }) =>
                checked &&
                visible && (
                  <li key={shooter_id}>
                    {firstName} {secondName}
                  </li>
                ),
            )
          )}
        </ul>
      }
      heading={'Czy na pewno chcesz usunąć wybrane elementy?'}
      secondaryText={'Anuluj'}
      primaryText={'Usuń'}
      handleClose={() => {
        setElementsState({
          showDeleteModal: false,
          toDeleteId: undefined,
        });
      }}
      handleConfirm={() => {
        if (elementsState.toDeleteId) {
          return handleDelete(elementsState.toDeleteId);
        }

        handleDelete();
      }}
    />
  );
}
