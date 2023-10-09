import React, {
  forwardRef,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import FlipMove from 'react-flip-move';
import cx from 'classnames';

import styles from '../../schools/elementsList/ElementsList.module.css';
import contestsStyle from './ElementsList.module.css';
import { ReactComponent as MoreIcon } from '../../../../assets/icons/more.svg';
import { ReactComponent as DeleteIcon } from '../../../../assets/icons/delete.svg';
import { ReactComponent as EditIcon } from '../../../../assets/icons/edit.svg';
import { ReactComponent as DropDownIcon } from '../../../../assets/icons/arrow_drop_down.svg';
import { ReactComponent as ThrophyIcon } from '../../../../assets/icons/trophy.svg';
import { ReactComponent as GroupIcon } from '../../../../assets/icons/groups.svg';
import { ReactComponent as ResultIcon } from '../../../../assets/icons/table.svg';

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
import { getMonthName } from '../../../../components/Calendar/Calendar';
import { useNavigate } from 'react-router-dom';

export default function ElementsList({
  seasons,
  currentSeason,
  setCurrentSeason,
  setIsEditing,
}) {
  const { schools, contests, setContests } = useContext(DataContext);
  const [elementsState, setElementsState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      showDeleteModal: false,
      filters: {
        date: true, //true=asc, false=desc, null=inactive
        location: null,
      },
      toDeleteId: undefined,
    },
  );
  const setFiltering = (dateState, locationState) => {
    setElementsState({
      filters: {
        date: dateState,
        location: locationState,
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
    const idsToDeleteList = [];
    const idsList = [];
    const idsToFilterList = [];

    if (id) {
      idsToDeleteList.push(
        fetchData({ action: 'deleteContest', contest_id: id }),
      );
      idsList.push(id);
    } else {
      contests.forEach((item) => {
        if (item.checked && item.visible) {
          idsToDeleteList.push(
            fetchData({ action: 'deleteContest', contest_id: item.contest_id }),
          );
          idsList.push(item.contest_id);
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
          } else if (result.status === 'fulfilled') {
            idsToFilterList.push(idsList[index]);
          }
        });

        setContests((prev) =>
          prev
            .filter((item) => !idsToFilterList.includes(item.contest_id))
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

  const handleCheckboxChange = (contest_id) => {
    setContests((prev) => {
      return prev.map((item) => {
        if (item.contest_id === contest_id) {
          return {
            ...item,
            checked: !item.checked,
          };
        }
        return item;
      });
    });
  };

  const handleSortForVisibility = (contests) => {
    if (!currentSeason) return contests;
    return contests.map((item) => {
      let newItem = { ...item, visible: true };
      const dateTimestamp = new Date(newItem.date).getTime();
      newItem.visible =
        currentSeason.value === false
          ? true
          : dateTimestamp >= currentSeason.value[0] &&
            dateTimestamp <= currentSeason.value[1];

      return newItem;
    });
  };

  useEffect(() => {
    if (!currentSeason) return;
    setContests((prev) =>
      prev.map((item) => {
        let newItem = { ...item, visible: true };
        const dateTimestamp = new Date(newItem.date).getTime();
        newItem.visible =
          currentSeason.value === false
            ? true
            : dateTimestamp >= currentSeason.value[0] &&
              dateTimestamp <= currentSeason.value[1];

        return newItem;
      }),
    );
  }, [currentSeason]);

  const { isEveryHidden, isEmpty, isEveryChecked, isAnyChecked } =
    getVisiblityInfo(contests);

  return (
    <div className={styles.container}>
      <div className={styles.searchNav}>
        <SelectWithHeading heading={'Sezon'}>
          <Select
            placeholder={seasons?.length > 0 ? 'Wybierz sezon' : 'Brak wyników'}
            width={200}
            height={50}
            options={
              seasons?.length > 0
                ? [{ label: 'Wszystkie', value: false }, ...seasons]
                : []
            }
            isSearchable={false}
            value={currentSeason}
            onChange={setCurrentSeason}
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
              setFiltering(!elementsState.filters.date, null);
            }}
            disabled={isEmpty || isEveryHidden}
          />
        </li>
        <li
          className={cx(styles['nav--element'], {
            [styles['desc-dropdown']]: !elementsState.filters.location,
            [styles['asc-dropdown']]: elementsState.filters.location,
          })}
        >
          <DefaultButton
            style={'text'}
            size={'small'}
            icon={<DropDownIcon />}
            iconPosition={'right'}
            text={'Runda'}
            action={() => {
              setFiltering(null, !elementsState.filters.location);
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
        {handleSortForVisibility(handleSort(contests)).map((props) => {
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
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const dateSplitted = date.split('-');
  return (
    <>
      <Checkbox
        checked={checked}
        onChange={() => handleCheckboxChange(contest_id)}
      />
      <span>
        {`${Number(dateSplitted[2])} 
        ${getMonthName(Number(dateSplitted[1]) - 1)} 
        ${dateSplitted[0]}`}
      </span>
      <span>{schools.find((i) => i.school_id === location)?.name}</span>
      <DefaultButton
        customSize={{
          height: '35px',
          width: '120px',
          fontSize: '1em',
        }}
        text={'Zarządzaj'}
        action={() => navigate(`/admin/contests/managment/teams/${contest_id}`)}
      />

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
            icon: <GroupIcon />,
            text: 'Drużyny',
            action: () => {
              navigate(`/admin/contests/managment/teams/${contest_id}`);
            },
          },
          {
            icon: <ResultIcon />,
            text: 'Wyniki',
            action: () => {
              navigate(`/admin/contests/managment/results/${contest_id}`);
            },
          },
          {
            icon: <ThrophyIcon />,
            text: 'Podium',
            action: () => {
              navigate(`/admin/contests/managment/podium/${contest_id}`);
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
  const [isLoading, setIsLoading] = useState(false);
  const getDescription = (location, date) => {
    const [year, month, day] = date.split('-');
    const schoolName = schools.find((i) => i.school_id === location).name;
    return `${Number(day)} ${getMonthName(
      Number(month) - 1,
    )} ${year} - ${schoolName}`;
  };
  const getDescriptionFromDeleteId = () => {
    const { location, date } = contests.find(
      (i) => i.contest_id === elementsState.toDeleteId,
    );

    return getDescription(location, date);
  };
  return (
    <ConfirmModal
      content={
        <ul className={styles.confirmList}>
          {elementsState.toDeleteId !== undefined ? (
            <li>{getDescriptionFromDeleteId()}</li>
          ) : (
            contests.map(({ contest_id, date, checked, visible, location }) => {
              return (
                checked &&
                visible && (
                  <li key={contest_id}>{getDescription(location, date)}</li>
                )
              );
            })
          )}
        </ul>
      }
      heading={'Czy na pewno chcesz usunąć wybrane elementy?'}
      secondaryText={'Anuluj'}
      primaryText={'Usuń'}
      isLoading={isLoading}
      handleClose={() => {
        setIsLoading(false);
        setElementsState({
          showDeleteModal: false,
          toDeleteId: undefined,
        });
      }}
      handleConfirm={() => {
        setIsLoading(true);
        if (elementsState.toDeleteId) {
          return handleDelete(elementsState.toDeleteId);
        }

        handleDelete();
      }}
    />
  );
}
