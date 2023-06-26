import React, { useReducer, useRef, useState } from 'react';
import cx from 'classnames';
import styles from './ElementsList.module.css';
import { ReactComponent as MoreIcon } from '../../../../assets/icons/more.svg';
import { ReactComponent as DeleteIcon } from '../../../../assets/icons/delete.svg';
import { ReactComponent as DropDownIcon } from '../../../../assets/icons/arrow_drop_down.svg';

import Checkbox from '../../../../components/checkbox/Checkbox';
import DefaultButton, {
  IconButton,
} from '../../../../components/button/Button';
import filterArrayOfObjects from '../../../../utils/filterArrayOfObjects';

export default function ElementsList({ data, setData }) {
  const [elementsState, setElementsState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      sortBy: undefined,
      idSortDesc: undefined,
      nameSortDesc: undefined,
      checkedList: new Array(data.length).fill(false),
    },
  );

  const handleSort = (data) => {
    console.log(data);
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

  // console.log(filterArrayOfObjects(data, 'name', 'asc'));
  // console.log(filterArrayOfObjects(data, 'name', 'desc'));
  return (
    <div className={styles.container}>
      <ul className={styles.nav}>
        <li className={styles['nav--element']}>
          <Checkbox
            checked={elementsState.checkedList.every((value) => value)}
            onChange={() => {
              let newCheckedList = elementsState.checkedList;
              if (newCheckedList.every((value) => value)) {
                newCheckedList.fill(false);
              } else {
                newCheckedList.fill(true);
              }
              setElementsState({
                checkedList: newCheckedList,
              });
            }}
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
            Icon={() => <DropDownIcon />}
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
            Icon={() => <DropDownIcon />}
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
            Icon={() => <DeleteIcon />}
          />
        </li>
      </ul>
      <div className={styles.elements}>
        {handleSort(data).map((item, index) => (
          <div
            className={styles.element}
            key={item.id}
            // style={{
            //   gridTemplateColumns:
            //     columnSizes ?? `repeat(${item.length + 2},auto)`,
            // }}
          >
            <Checkbox
              checked={elementsState.checkedList[index]}
              onChange={() => {
                let newCheckedList = elementsState.checkedList;
                newCheckedList[index] = !newCheckedList[index];
                setElementsState({
                  checkedList: newCheckedList,
                });
              }}
            />
            <span>{item.id}</span> <span>{item.name}</span>
            <button className={styles['element--more']}>
              <MoreIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
