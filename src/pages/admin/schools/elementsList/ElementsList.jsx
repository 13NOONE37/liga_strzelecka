import React, { useReducer, useRef, useState } from 'react';
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

export default function ElementsList({ data, setData }) {
  const [elementsState, setElementsState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      showDeleteModal: false,
      sortBy: undefined,
      idSortDesc: undefined,
      nameSortDesc: undefined,
      checkedList: new Array(
        ...data.map((item) => ({
          id: item.id,
          checked: false,
        })),
      ),
    },
  );

  const handleSelectAll = () => {
    const newCheckedList = elementsState.checkedList.map((item) => ({
      id: item.id,
      checked: !elementsState.checkedList.every((value) => value.checked),
    }));

    setElementsState({ checkedList: newCheckedList });
  };
  const handleSort = (data) => {
    filterArrayOfObjects(data, 'id', 'asc');

    if (elementsState.idSortDesc) {
      return filterArrayOfObjects(data, 'id', 'desc');
    } else if (elementsState.idSortDesc === false) {
      return filterArrayOfObjects(data, 'id', 'asc');
    }

    if (elementsState.nameSortDesc) {
      return filterArrayOfObjects(data, 'name', 'desc');
    } else if (elementsState.nameSortDesc === false) {
      return filterArrayOfObjects(data, 'name', 'asc');
    }

    return data;
  };
  const handleDelete = (id) => {
    let newCheckedList = elementsState.checkedList;
    let newData = data;

    if (id) {
      // Delete item of the given id
      newData = newData.filter((item) => item.id !== id);
    } else {
      // Delete all checked items
      newData = newData.filter(
        (item) => !newCheckedList.find((i) => i.id === item.id).checked,
      );
    }

    newCheckedList = newData.map((item) => ({
      id: item.id,
      checked: false,
    }));

    setData(newData);
    setElementsState({ checkedList: newCheckedList, showDeleteModal: false });
  };

  //  more button https://dribbble.com/shots/17694958-Music-App
  //należąłoby zastować inteligentną pozycję tj jesli brakuje miejsca po prawej to się lekko przesunie w lewo itd.

  // skeleton component stworzymy własny uniwersalny komponent z animacją ładowania, ale będzie można ją też jakoś łatwo zmienić

  return (
    <div className={styles.container}>
      <ul className={styles.nav}>
        <li className={styles['nav--element']}>
          <Checkbox
            checked={elementsState.checkedList.every(({ checked }) => checked)}
            onChange={handleSelectAll}
          />
        </li>
        <li
          className={cx(styles['nav--element'], {
            [styles['desc-dropdown']]: !elementsState.idSortDesc,
            [styles['asc-dropdown']]: elementsState.idSortDesc,
          })}
        >
          <DefaultButton
            style={'text'}
            size={'small'}
            icon={<DropDownIcon />}
            iconPosition={'right'}
            text={'Id'}
            action={() => {
              setElementsState({
                idSortDesc: !elementsState.idSortDesc,
                nameSortDesc: undefined,
              });
            }}
          />
        </li>
        <li
          className={cx(styles['nav--element'], {
            [styles['desc-dropdown']]: !elementsState.nameSortDesc,
            [styles['asc-dropdown']]: elementsState.nameSortDesc,
          })}
        >
          <DefaultButton
            style={'text'}
            size={'small'}
            icon={<DropDownIcon />}
            iconPosition={'right'}
            text={'Nazwa'}
            action={() => {
              setElementsState({
                idSortDesc: undefined,
                nameSortDesc: !elementsState.nameSortDesc,
              });
            }}
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
            disabled={elementsState.checkedList.every(
              ({ checked }) => !checked,
            )}
          />
        </li>
      </ul>
      <FlipMove className={styles.elements} duration={300} delay={50}>
        {handleSort(data).map((item, index) => {
          const checkedItem = elementsState.checkedList.find(
            (i) => i.id === item.id,
          );
          const handleCheckboxChange = () => {
            const newCheckedList = elementsState.checkedList.map((i) => {
              if (i.id === item.id) {
                return { ...i, checked: !i.checked };
              }
              return i;
            });

            setElementsState({
              checkedList: newCheckedList,
            });
          };

          return (
            <div className={styles.element} key={item.id}>
              <Checkbox
                checked={checkedItem.checked}
                onChange={handleCheckboxChange}
              />
              <span>{item.id}</span> <span>{item.name}</span>
              <ContextMenu
                options={[
                  {
                    icon: <EditIcon />,
                    text: 'Edytuj',
                    action: () => {},
                  },
                  {
                    icon: <DeleteIcon />,
                    text: 'Usuń',
                    action: () => {},
                  },
                ]}
              >
                {(setActive, ref) => (
                  <button
                    className={styles['element--more']}
                    onClick={setActive}
                    ref={ref}
                  >
                    <MoreIcon />
                  </button>
                )}
              </ContextMenu>
            </div>
          );
        })}
      </FlipMove>
      {elementsState.showDeleteModal && (
        <ConfirmModal
          content={
            <ul className={styles.confirmList}>
              {data.map((item) => {
                const isChecked = elementsState.checkedList.find(
                  (i) => i.id === item.id,
                )?.checked;

                if (isChecked) {
                  return <li key={item.id}>{item.name}</li>;
                }
                return null;
              })}
            </ul>
          }
          heading={'Czy na pewno chcesz usunąć wybrane elementy?'}
          secondaryText={'Anuluj'}
          primaryText={'Usuń'}
          handleClose={() => {
            setElementsState({ showDeleteModal: false });
          }}
          handleConfirm={handleDelete}
        />
      )}
    </div>
  );
}
