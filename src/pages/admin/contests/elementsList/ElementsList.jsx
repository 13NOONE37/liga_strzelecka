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
import contestsStyle from './ElementsList.module.css';
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
import DataContext from '../../../../store/DataContext';
import getVisiblityInfo from '../../../../utils/getVisiblityInfo';
import Select from '../../../../components/select/Select';
import SelectWithHeading from '../../../../components/select/SelectWithHeading';

export default function ElementsList({ setIsEditing }) {
  const { schools, contests, setContests } = useContext(DataContext);
  const [elementsState, setElementsState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      showDeleteModal: false,
      filters: {
        date: false, //true=asc, false=desc, null=inactive
      },
      toDeleteId: undefined,
    },
  );
  const setFiltering = (dateState) => {
    setElementsState({
      filters: {
        date: dateState,
      },
    });
  };
  const handleCheckAll = () => {
    setContests((prev) =>
      prev.map((item) => {
        return {
          ...item,
          checked: item.visible ? !prev.every(({ checked }) => checked) : false,
        };
      }),
    );
  };
  const handleSort = (contests) => {
    // filterArrayOfObjects(contests, 'index', 'asc');

    let currentFilter;
    for (const filter of Object.entries(elementsState.filters)) {
      if (filter[1] !== null) {
        currentFilter = filter;
        break;
      }
    }

    if (currentFilter) {
      return filterArrayOfObjects(
        contests,
        currentFilter[0],
        currentFilter[1] ? 'desc' : 'asc',
      );
    }

    return contests;
  };
  const handleDelete = (id) => {
    return;
    const idsToDeleteList = [];
    let idsToFilterList = [];

    if (id) {
      idsToDeleteList.push(
        fetchData({ action: 'deleteSchool', school_id: id }),
      );
      idsToFilterList.push(id);
    } else {
      contests.forEach((item) => {
        if (item.checked && item.visible) {
          idsToDeleteList.push(
            fetchData({ action: 'deleteSchool', school_id: item.school_id }),
          );
          idsToFilterList.push(item.school_id);
        }
      });
    }

    Promise.allSettled(idsToDeleteList)
      .then((response) => {
        response.forEach((result, index) => {
          if (result.status === 'rejected') {
            if (result.reason.response.status === 409) {
              toast.error(
                `Nie można usunąć szkoły "${
                  contests.find((v) => v.school_id === idsToFilterList[index])
                    .name
                }" ponieważ wciąż są do niej przypisani strzelcy.`,
                {
                  autoClose: 5000,
                },
              );
            } else {
              toast.error(`Coś poszło nie tak. Spróbuj ponownie."`, {
                autoClose: 5000,
              });
            }
            idsToFilterList = idsToFilterList.filter(
              (_, index2) => index !== index2,
            );
          }
        });

        setSchools((prev) =>
          prev
            .filter((item) => !idsToFilterList.includes(item.school_id))
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

  const handleCheckboxChange = (school_id) => {
    return;
    setSchools((prev) => {
      return prev.map((item) => {
        if (item.school_id === school_id) {
          return {
            ...item,
            checked: !item.checked,
          };
        }
        return item;
      });
    });
  };

  const { isEveryHidden, isEmpty, isEveryChecked, isAnyChecked } =
    getVisiblityInfo(contests);

  return (
    <div className={styles.container}>
      <div className={styles.searchNav}>
        <SelectWithHeading heading={''}>
          <Select
            placeholder={'Sezon'}
            width={200}
            height={50}
            options={[
              { value: null, label: '2022/23' },
              { value: 1, label: '2021/22' },
              { value: 0, label: '2020/21' },
            ]}
            isSearchable={false}
            // value={currentGender}
            // onChange={setCurrentGender}
          />
        </SelectWithHeading>
      </div>

      <ul className={cx(styles.nav, contestsStyle.nav)}>
        <li className={styles['nav--element']}>
          <Checkbox
            checked={!isEmpty && isEveryChecked}
            onChange={handleCheckAll}
            disabled={isEmpty || isEveryHidden}
          />
        </li>
        <li
          className={cx(styles['nav--element'], {
            [styles['desc-dropdown']]: !elementsState.filters.date,
            [styles['asc-dropdown']]: elementsState.filters.date,
          })}
        >
          <DefaultButton
            style={'text'}
            size={'small'}
            icon={<DropDownIcon />}
            iconPosition={'right'}
            text={'Data'}
            action={() => {
              setFiltering(!elementsState.filters.date);
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
        className={cx(styles.elements, contestsStyle.elements)}
        duration={300}
        delay={50}
      >
        {handleSort(contests).map((props) => {
          return (
            props.visible && (
              <div
                className={cx(styles.element, contestsStyle.element)}
                key={props.contest_id}
              >
                <ContestComponent
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
          contests={contests}
          schools={schools}
          elementsState={elementsState}
          setElementsState={setElementsState}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}

const ContestComponent = ({
  contest_id,
  checked,
  handleCheckboxChange,
  date,
  location,
  schools,
  setIsEditing,
  setElementsState,
}) => {
  const buttonRef = useRef(null);
  return (
    <>
      <Checkbox
        checked={checked}
        onChange={() => handleCheckboxChange(contest_id)}
      />
      <span>{date}</span>
      <span>{schools.find((i) => i.school_id === location).name}</span>
      <ContextMenu
        options={[
          {
            icon: <EditIcon />,
            text: 'Edytuj',
            action: () => {
              setIsEditing(contest_id);
            },
          },
          {
            icon: <DeleteIcon />,
            text: 'Usuń',
            action: () => {
              setElementsState({
                showDeleteModal: true,
                toDeleteId: contest_id,
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
  contests,
  schools,
  elementsState,
  setElementsState,
  handleDelete,
}) {
  return (
    <ConfirmModal
      content={
        <ul className={styles.confirmList}>
          {elementsState.toDeleteId !== undefined ? (
            <li>
              {
                contests.find((i) => i.contest_id === elementsState.toDeleteId)
                  .date
              }
              {schools.find((i) => i.school_id === location).name}
            </li>
          ) : (
            contests.map(
              ({ contest_id, checked, visible, location }) =>
                checked &&
                visible && (
                  <li key={contest_id}>
                    {date} {schools.find((i) => i.school_id === location).name}
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
