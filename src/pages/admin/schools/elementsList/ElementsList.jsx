import React, { useEffect, useReducer } from 'react';
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
import Skeleton from '../../../../components/skeletonLoading/Skeleton';

export default function ElementsList({
  isLoading,
  data,
  setData,
  setIsEditing,
}) {
  const [elementsState, setElementsState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      showDeleteModal: false,
      sortBy: undefined,
      indexSortDesc: undefined,
      nameSortDesc: undefined,
      checkedList: [],
      toDeleteId: undefined,
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
    if (elementsState.nameSortDesc) {
      return filterArrayOfObjects(data, 'name', 'desc');
    } else if (elementsState.nameSortDesc === false) {
      return filterArrayOfObjects(data, 'name', 'asc');
    }
    if (elementsState.indexSortDesc) {
      return filterArrayOfObjects(data, 'index', 'desc');
    } else if (elementsState.indexSortDesc === false) {
      return filterArrayOfObjects(data, 'index', 'asc');
    }

    return data;
  };
  const handleDelete = (id) => {
    let newCheckedList = elementsState.checkedList;
    let newData = data;

    if (id) {
      // Delete item of the given id
      newData = newData.filter((item) => item.id !== id);
      newCheckedList = newData.map((item) => {
        let temp = {
          id: item.id,
          checked: newCheckedList.find((i) => i.id === item.id).checked,
        };
        if (item.id === id) temp.checked = false;

        return temp;
      });
    } else {
      // Delete all checked items
      newData = newData.filter(
        (item) => !newCheckedList.find((i) => i.id === item.id).checked,
      );
      newCheckedList = newData.map((item) => ({
        id: item.id,
        checked: false,
      }));
    }

    setData(newData);
    setElementsState({
      checkedList: newCheckedList,
      showDeleteModal: false,
      toDeleteId: undefined,
    });
  };

  useEffect(() => {
    setElementsState({
      checkedList: new Array(
        ...data.map((item) => ({
          id: item.id,
          checked:
            elementsState.checkedList.find((i) => i.id === item.id)?.checked ??
            false,
        })),
      ),
    });
  }, [data]);

  return (
    <div className={styles.container}>
      <ul className={styles.nav}>
        <li className={styles['nav--element']}>
          <Checkbox
            checked={
              elementsState.checkedList.length > 0 &&
              elementsState.checkedList.every(({ checked }) => checked)
            }
            onChange={handleSelectAll}
            disabled={elementsState.checkedList.length === 0}
          />
        </li>
        <li
          className={cx(styles['nav--element'], {
            [styles['desc-dropdown']]: !elementsState.indexSortDesc,
            [styles['asc-dropdown']]: elementsState.indexSortDesc,
          })}
        >
          <DefaultButton
            style={'text'}
            size={'small'}
            icon={<DropDownIcon />}
            iconPosition={'right'}
            text={'Lp.'}
            action={() => {
              setElementsState({
                indexSortDesc: !elementsState.indexSortDesc,
                nameSortDesc: undefined,
              });
            }}
            disabled={elementsState.checkedList.length === 0}
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
                indexSortDesc: undefined,
                nameSortDesc: !elementsState.nameSortDesc,
              });
            }}
            disabled={elementsState.checkedList.length === 0}
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
      {isLoading ? (
        <>
          <div className={styles.elements}>
            <Skeleton width={'100%'} height={'54px'} />
            <Skeleton width={'100%'} height={'54px'} />
            <Skeleton width={'100%'} height={'54px'} />
            <Skeleton width={'100%'} height={'54px'} />
            <Skeleton width={'100%'} height={'54px'} />
            <Skeleton width={'100%'} height={'54px'} />
          </div>
        </>
      ) : (
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
                  checked={checkedItem?.checked}
                  onChange={handleCheckboxChange}
                />
                <span>{item.index}</span> <span>{item.name}</span>
                <ContextMenu
                  options={[
                    {
                      icon: <EditIcon />,
                      text: 'Edytuj',
                      action: () => {
                        setIsEditing(item.id);
                      },
                    },
                    {
                      icon: <DeleteIcon />,
                      text: 'Usuń',
                      action: () => {
                        setElementsState({
                          showDeleteModal: true,
                          toDeleteId: item.id,
                        });
                      },
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
      )}

      {elementsState.showDeleteModal && (
        <ConfirmModal
          content={
            <ul className={styles.confirmList}>
              {elementsState.toDeleteId !== undefined ? (
                <li>
                  {data.find((i) => i.id === elementsState.toDeleteId).name}
                </li>
              ) : (
                data.map((item) => {
                  const isChecked = elementsState.checkedList.find(
                    (i) => i.id === item.id,
                  )?.checked;

                  if (isChecked) {
                    return <li key={item.id}>{item.name}</li>;
                  }
                  return null;
                })
              )}
            </ul>
          }
          heading={'Czy na pewno chcesz usunąć wybrane elementy?'}
          secondaryText={'Anuluj'}
          primaryText={'Usuń'}
          handleClose={() => {
            setElementsState({ showDeleteModal: false, toDeleteId: undefined });
          }}
          handleConfirm={() => {
            if (elementsState.toDeleteId) {
              return handleDelete(elementsState.toDeleteId);
            }
            handleDelete();
          }}
        />
      )}
    </div>
  );
}
