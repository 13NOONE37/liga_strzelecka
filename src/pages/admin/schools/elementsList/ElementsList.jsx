import React, {
  forwardRef,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import FlipMove from 'react-flip-move';
import cx from 'classnames';

import styles from './ElementsList.module.css';

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

export default function ElementsList({ setIsEditing }) {
  const { schools, setSchools } = useContext(DataContext);
  const [elementsState, setElementsState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      showDeleteModal: false,
      filters: {
        name: false, //true=asc, false=desc, null=inactive
      },
      toDeleteId: undefined,
      tempSearchPhrase: '',
      searchPhrase: '',
    },
  );
  const setFiltering = (nameState) => {
    setElementsState({
      filters: {
        name: nameState,
      },
    });
  };
  const handleCheckAll = () => {
    setSchools((prev) =>
      prev.map((item) => {
        return {
          ...item,
          checked: item.visible ? !prev.every(({ checked }) => checked) : false,
        };
      }),
    );
  };
  const handleSort = (schools) => {
    // filterArrayOfObjects(schools, 'index', 'asc');

    let currentFilter;
    for (const filter of Object.entries(elementsState.filters)) {
      if (filter[1] !== null) {
        currentFilter = filter;
        break;
      }
    }

    if (currentFilter) {
      return filterArrayOfObjects(
        schools,
        currentFilter[0],
        currentFilter[1] ? 'desc' : 'asc',
      );
    }

    return schools;
  };
  const handleDelete = (id) => {
    const idsToDeleteList = [];
    const idsList = [];
    const idsToFilterList = [];

    if (id) {
      idsToDeleteList.push(
        fetchData({ action: 'deleteSchool', school_id: id }),
      );
      idsList.push(id);
    } else {
      schools.forEach((item) => {
        if (item.checked && item.visible) {
          idsToDeleteList.push(
            fetchData({ action: 'deleteSchool', school_id: item.school_id }),
          );
          idsList.push(item.school_id);
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
                  schools.find((v) => v.school_id === idsList[index]).name
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
          } else if (result.status === 'fulfilled') {
            idsToFilterList.push(idsList[index]);
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

  useEffect(() => {
    const phrase = elementsState.searchPhrase.trim().replace(/\//g, '\\/');
    const regex = new RegExp(phrase, 'i');

    setSchools((prev) =>
      prev.map((item) => ({
        ...item,
        visible: regex.test(item.name),
      })),
    );
  }, [elementsState.searchPhrase]);

  const handleCheckboxChange = (school_id) => {
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
    getVisiblityInfo(schools);

  return (
    <div className={styles.container}>
      <div className={styles.searchNav}>
        <div className={styles['searchNav--search']}>
          <SearchInput
            tempValue={elementsState.tempSearchPhrase}
            onChange={(e) => {
              setElementsState({ tempSearchPhrase: e.target.value });
            }}
            setValue={(value) => setElementsState({ searchPhrase: value })}
          />
        </div>
      </div>

      <ul className={styles.nav}>
        <li className={styles['nav--element']}>
          <Checkbox
            checked={!isEmpty && isEveryChecked}
            onChange={handleCheckAll}
            disabled={isEmpty || isEveryHidden}
          />
        </li>
        <li
          className={cx(styles['nav--element'], {
            [styles['desc-dropdown']]: !elementsState.filters.name,
            [styles['asc-dropdown']]: elementsState.filters.name,
          })}
        >
          <DefaultButton
            style={'text'}
            size={'small'}
            icon={<DropDownIcon />}
            iconPosition={'right'}
            text={'Nazwa'}
            action={() => {
              setFiltering(!elementsState.filters.name);
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

      <FlipMove className={styles.elements} duration={300} delay={50}>
        {handleSort(schools).map((props) => {
          return (
            props.visible && (
              <div className={styles.element} key={props.school_id}>
                <SchoolComponent
                  {...props}
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
          schools={schools}
          elementsState={elementsState}
          setElementsState={setElementsState}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}

const SchoolComponent = ({
  school_id,
  checked,
  handleCheckboxChange,
  name,
  setIsEditing,
  setElementsState,
}) => {
  const buttonRef = useRef(null);
  return (
    <>
      <Checkbox
        checked={checked}
        onChange={() => handleCheckboxChange(school_id)}
      />
      <span>{name}</span>
      <ContextMenu
        options={[
          {
            icon: <EditIcon />,
            text: 'Edytuj',
            action: () => {
              setIsEditing(school_id);
            },
          },
          {
            icon: <DeleteIcon />,
            text: 'Usuń',
            action: () => {
              setElementsState({
                showDeleteModal: true,
                toDeleteId: school_id,
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
                schools.find((i) => i.school_id === elementsState.toDeleteId)
                  .name
              }
            </li>
          ) : (
            schools.map(
              ({ school_id, checked, visible, name }) =>
                checked && visible && <li key={school_id}>{name}</li>,
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
