import React, { useEffect, useReducer } from 'react';
import FlipMove from 'react-flip-move';
import cx from 'classnames';

import styles from '../../schools/elementsList/ElementsList.module.css';
import shootersStyles from './ElementsList.module.css';

import { ReactComponent as MoreIcon } from '../../../../assets/icons/more.svg';
import { ReactComponent as DeleteIcon } from '../../../../assets/icons/delete.svg';
import { ReactComponent as EditIcon } from '../../../../assets/icons/edit.svg';
import { ReactComponent as DropDownIcon } from '../../../../assets/icons/arrow_drop_down.svg';
import { ReactComponent as SearchIcon } from '../../../../assets/icons/search.svg';

import Checkbox from '../../../../components/checkbox/Checkbox';
import DefaultButton, {
  IconButton,
} from '../../../../components/button/Button';
import filterArrayOfObjects from '../../../../utils/filterArrayOfObjects';
import ConfirmModal from '../../../../components/modal/RTUComponents/ConfirmModal/ConfirmModal';
import ContextMenu from '../../../../components/contextMenu/ContextMenu';
import Skeleton from '../../../../components/skeletonLoading/Skeleton';
import Select from '../../../../components/select/Select';
import Input from '../../../../components/input/Input';

export default function ElementsList({
  isLoading,
  data,
  setData,
  setIsEditing,
  currentSchool,
  setCurrentSchool,
}) {
  const [elementsState, setElementsState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      showDeleteModal: false,
      sortBy: undefined,
      indexSortDesc: undefined,
      firstNameSortDesc: undefined,
      secondNameSortDesc: undefined,
      genderFilter: -1, //-1 all, 0 women, 1 men
      tempSearchPhrase: '',
      searchPhrase: '',
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

  const handleMerge = (data) => {
    //Get shooters only from selected school
    if (currentSchool && currentSchool.value !== -1) {
      data = data.filter((person) => person.schoolId === currentSchool.value);
    }

    //Filter by gender
    if (
      elementsState.genderFilter.value === 0 ||
      elementsState.genderFilter.value === 1
    ) {
      data = data.filter(
        (person) => person.isMan == elementsState.genderFilter.value,
      );
    }

    //Filter by search phrase
    if (elementsState.searchPhrase) {
      const phrase = elementsState.searchPhrase.replace(/\//g, '\\/');
      const regex = new RegExp(phrase, 'i');
      data = data.filter((person) => {
        return regex.test(person.firstName) || regex.test(person.secondName);
      });
    }

    return handleSort(data);
  };
  const handleSort = (data) => {
    filterArrayOfObjects(data, 'id', 'asc');

    if (elementsState.firstNameSortDesc) {
      return filterArrayOfObjects(data, 'firstName', 'desc');
    } else if (elementsState.firstNameSortDesc === false) {
      return filterArrayOfObjects(data, 'firstName', 'asc');
    }

    if (elementsState.secondNameSortDesc) {
      return filterArrayOfObjects(data, 'secondName', 'desc');
    } else if (elementsState.secondNameSortDesc === false) {
      return filterArrayOfObjects(data, 'secondName', 'asc');
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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setElementsState({ searchPhrase: elementsState.tempSearchPhrase });
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [elementsState.tempSearchPhrase]);

  //todo checked musi dotyczyc tylko widocznych elementow

  //todo zaaplikowac szkoly i strzelcow do globalnego contextu
  //todo ale ladowane sa dopiero gdy wlaczymy dana karte(przemyslec)

  //todo polaczyc z backendem
  //!!! we need to display max 50 first elements for optimaztion
  return (
    <div className={styles.container}>
      <div className={shootersStyles.searchNav}>
        <div className={shootersStyles['searchNav--select']}>
          <Select
            placeholder={'Wybierz szkołę'}
            width={300}
            height={50}
            options={[
              { value: -1, label: 'Wszystkie Szkoły' },
              { value: 1, label: 'Szkoła Podstawowa nr 1' }, //value is of course id of school
              { value: 2, label: 'Gimnazjum im. Jana Kowalskiego' },
              { value: 3, label: 'Liceum Ogólnokształcące nr 5' },
              { value: 4, label: 'Szkoła Artystyczna dla Młodych Talentów' },
              {
                value: 5,
                label: 'Technikum Elektryczne im. Marii Skłodowskiej-Curie',
              },
              { value: 6, label: 'Szkoła Podstawowa nr 3' },
            ]}
            isSearchable={true}
            value={currentSchool}
            onChange={setCurrentSchool}
          />
        </div>
        <div className={shootersStyles['searchNav--search']}>
          <Input
            icon={
              <div
                style={{
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <SearchIcon
                  style={{ fill: '#fff', width: '25px', height: '25px' }}
                />
              </div>
            }
            iconPosition={'right'}
            value={elementsState.tempSearchPhrase}
            onChange={(e) => {
              setElementsState({ tempSearchPhrase: e.target.value });
            }}
            placeholder={'Szukaj...'}
          />
        </div>
      </div>
      <ul className={cx(styles.nav, shootersStyles.nav)}>
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
                firstNameSortDesc: undefined,
                secondNameSortDesc: undefined,
              });
            }}
            disabled={elementsState.checkedList.length === 0}
          />
        </li>
        <li
          className={cx(styles['nav--element'], {
            [styles['desc-dropdown']]: !elementsState.firstNameSortDesc,
            [styles['asc-dropdown']]: elementsState.firstNameSortDesc,
          })}
        >
          <DefaultButton
            style={'text'}
            size={'small'}
            icon={<DropDownIcon />}
            iconPosition={'right'}
            text={'Imię'}
            action={() => {
              setElementsState({
                indexSortDesc: undefined,
                firstNameSortDesc: !elementsState.firstNameSortDesc,
                secondNameSortDesc: undefined,
              });
            }}
            disabled={elementsState.checkedList.length === 0}
          />
        </li>
        <li
          className={cx(styles['nav--element'], {
            [styles['desc-dropdown']]: !elementsState.secondNameSortDesc,
            [styles['asc-dropdown']]: elementsState.secondNameSortDesc,
          })}
        >
          <DefaultButton
            style={'text'}
            size={'small'}
            icon={<DropDownIcon />}
            iconPosition={'right'}
            text={'Nazwisko'}
            action={() => {
              setElementsState({
                indexSortDesc: undefined,
                firstNameSortDesc: undefined,
                secondNameSortDesc: !elementsState.secondNameSortDesc,
              });
            }}
            disabled={elementsState.checkedList.length === 0}
          />
        </li>
        <li className={cx(styles['nav--element'])}>
          <Select
            options={[
              { label: 'Wszyscy', value: -1 },
              { label: 'Kobieta', value: 0 },
              { label: 'Mężczyzna', value: 1 },
            ]}
            placeholder={'Wybierz płeć'}
            isSearchable={false}
            width={175}
            height={40}
            value={elementsState.genderFilter}
            onChange={(value) => setElementsState({ genderFilter: value })}
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
          {handleMerge(data).map((item, index) => {
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
              <div
                className={cx(styles.element, shootersStyles.element)}
                key={item.id}
              >
                <Checkbox
                  checked={checkedItem?.checked}
                  onChange={handleCheckboxChange}
                />
                <span>{item.index}</span> <span>{item.firstName}</span>
                <span>{item.secondName}</span>
                <span>{item.isMan ? 'Mężczyzna' : 'Kobieta'}</span>
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
