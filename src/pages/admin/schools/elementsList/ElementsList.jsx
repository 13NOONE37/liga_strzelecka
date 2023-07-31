import React, { forwardRef, useReducer, useRef } from 'react';
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

export default function ElementsList({ data, setData, setIsEditing }) {
  const [elementsState, setElementsState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      showDeleteModal: false,
      filters: {
        index: null, //true=asc, false=desc, null=inactive
        name: null,
      },
      toDeleteId: undefined,
    },
  );
  const setFiltering = (indexState, nameState) => {
    setElementsState({
      filters: {
        index: indexState,
        name: nameState,
      },
    });
  };
  const handleCheckAll = () => {
    setData((prev) =>
      prev.map((item) => {
        return {
          ...item,
          checked: !prev.every(({ checked }) => checked),
        };
      }),
    );
  };
  const handleSort = (data) => {
    filterArrayOfObjects(data, 'index', 'asc');

    let currentFilter;
    for (const filter of Object.entries(elementsState.filters)) {
      if (filter[1]) {
        currentFilter = filter;
        break;
      }
    }

    if (currentFilter) {
      return filterArrayOfObjects(
        data,
        currentFilter[0],
        currentFilter[1] ? 'desc' : 'asc',
      );
    }

    return data;
  };
  const handleDelete = (id) => {
    const idsToDeleteList = [];
    let idsToFilterList = [];

    if (id) {
      idsToDeleteList.push(
        fetchData({ action: 'deleteSchool', school_id: id }),
      );
      idsToFilterList.push(id);
    } else {
      data.forEach((item) => {
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
                  data.find((v) => v.school_id === idsToFilterList[index]).name
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

        setData((prev) =>
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
    setData((prev) => {
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

  const isEmpty = data?.length == 0;
  const isEveryChecked = data.every(({ checked }) => checked);
  const isAnyChecked = data.some(({ checked }) => checked);
  return (
    <div className={styles.container}>
      <ul className={styles.nav}>
        <li className={styles['nav--element']}>
          <Checkbox
            checked={!isEmpty && isEveryChecked}
            onChange={handleCheckAll}
            disabled={isEmpty}
          />
        </li>
        <li
          className={cx(styles['nav--element'], {
            [styles['desc-dropdown']]: !elementsState.filters.index,
            [styles['asc-dropdown']]: elementsState.filters.index,
          })}
        >
          <DefaultButton
            style={'text'}
            size={'small'}
            icon={<DropDownIcon />}
            iconPosition={'right'}
            text={'Lp.'}
            action={() => {
              setFiltering(!elementsState.filters.index, null);
            }}
            disabled={isEmpty}
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
              setFiltering(null, !elementsState.filters.name);
            }}
            disabled={isEmpty}
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
        {handleSort(data).map((props) => {
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
          data={data}
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
  index,
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
      <span>{index}</span>
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
  data,
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
              {data.find((i) => i.school_id === elementsState.toDeleteId).name}
            </li>
          ) : (
            data.map(
              ({ school_id, checked, name }) =>
                checked && <li key={school_id}>{name}</li>,
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
