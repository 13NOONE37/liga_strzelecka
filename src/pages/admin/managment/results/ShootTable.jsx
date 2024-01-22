import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import styles from './ShootTable.module.css';
import { IconButton } from '../../../../components/button/Button';
import { ReactComponent as EditIcon } from '../../../../assets/icons/edit.svg';
import useShortcuts from '../../../../utils/useShortcuts';
import fetchData from '../../../../utils/fetchData';
import { toast } from 'react-toastify';

let elements = [];
const FOCUS_SHIFT_LEFT = -1;
const FOCUS_SHIFT_RIGHT = 1;
const FOCUS_SHIFT_UP = -10;
const FOCUS_SHIFT_DOWN = 10;
export default function ShootTable({
  contesters,
  setContesters,
  shooters,
  currentTeam,
  currentMode,
}) {
  const tableElements = useRef(null);
  const [currentFocused, setCurrentFocused] = useState(null);

  const handleChangeValue = async (user, value, pointName) => {
    setContesters((prev) =>
      prev.map((item) => {
        if (item.shooter_id === user.shooter_id) {
          return {
            ...item,
            [pointName]: value,
          };
        }
        return { ...item };
      }),
    );
    try {
      await fetchData({
        action: 'updateContesterPoints',
        team_id: currentTeam,
        shooter_id: user.shooter_id,
        pointName: pointName,
        value: value,
      });
    } catch (error) {
      toast.error('Coś poszło nie tak.', {
        autoClose: 3000,
        pauseOnHover: false,
      });

      setContesters((prev) =>
        prev.map((item) => {
          if (item.shooter_id === user.shooter_id) {
            return {
              ...item,
              [pointName]: null,
            };
          }
          return { ...item };
        }),
      );
    }
  };
  const handleFocusCurrentElement = () => {
    if (!currentFocused) return;
    currentFocused.focus();
  };
  const handleFocusElement = (shift) => {
    if (elements.length === 0) return;
    let indexToFocus;
    let indexToRemember;

    //Search for current focused element(virtual and real)
    focusLoop: for (let index = 0; index < elements.length; index++) {
      if (elements[index].children[0] === currentFocused) {
        indexToRemember = (index + shift + elements.length) % elements.length;
      }
      if (elements[index] === document.activeElement.parentElement) {
        indexToFocus = (index + shift + elements.length) % elements.length;
        break focusLoop;
      }
    }
    if (indexToFocus !== undefined) {
      setCurrentFocused(elements[indexToFocus].children[0]);
      elements[indexToFocus].children[0].focus();
    } else if (indexToRemember !== undefined) {
      setCurrentFocused(elements[indexToRemember].children[0]);
    }
  };
  const setValue = (value) => {
    if (currentFocused) {
      const event = new CustomEvent('changeValue', {
        bubbles: true,
        detail: { value: value },
      });
      currentFocused.dispatchEvent(event);
      handleFocusElement(FOCUS_SHIFT_RIGHT);
    }
  };

  useShortcuts([
    {
      key: 'ArrowUp',
      handler: () => {
        handleFocusElement(FOCUS_SHIFT_UP);
      },
    },
    {
      key: 'ArrowDown',
      handler: () => {
        handleFocusElement(FOCUS_SHIFT_DOWN);
      },
    },
    {
      key: 'ArrowLeft',
      handler: () => {
        handleFocusElement(FOCUS_SHIFT_LEFT);
      },
    },
    {
      key: 'ArrowRight',
      handler: () => {
        handleFocusElement(FOCUS_SHIFT_RIGHT);
      },
    },
    {
      key: 'Enter',
      handler: () => {
        handleFocusCurrentElement();
      },
    },
  ]);
  useEffect(() => {
    elements = [];
    if (tableElements.current) {
      for (const element of tableElements.current.children) {
        const childrenToPush = Array.from(
          element.querySelectorAll('span:has(input)'),
        );
        elements.push(...childrenToPush);
      }
      setCurrentFocused(elements[0].children[0]);
    }
    return () => (elements = []);
  }, [currentTeam, currentMode]);

  const localContesters = contesters.filter(
    (contester) =>
      contester.team_id === currentTeam && contester.isInTeam === currentMode,
  );

  const sumContesterPoints = (contester) => {
    let sum = 0;

    for (let i = 1; i <= 10; i++) {
      const shootKey = `shoot_${i}`;
      if (typeof contester[shootKey] === 'number') {
        sum += contester[shootKey];
      }
    }

    return sum;
  };
  const countContesterTens = (contester) => {
    let sum = 0;

    for (let i = 1; i <= 10; i++) {
      const shootKey = `shoot_${i}`;
      if (
        typeof contester[shootKey] === 'number' &&
        contester[shootKey] === 10
      ) {
        sum += 1;
      }
    }

    return sum;
  };
  const getTotalTeamPoints = () => {
    return localContesters.reduce((acc, value) => {
      return acc + sumContesterPoints(value);
    }, 0);
  };
  const getTotalTeamTens = () => {
    return localContesters.reduce((acc, value) => {
      return acc + countContesterTens(value);
    }, 0);
  };
  return localContesters.length > 0 ? (
    <>
      <div className={styles.table}>
        <div className={styles['table--nav']}>
          <span>Imię i nazwisko</span>
          <span>Strzały</span>
          <span>Dziesiątki</span>
          <span>Punkty</span>
        </div>
        <div className={styles['table--results']} ref={tableElements}>
          {localContesters.map((contester) => {
            const user = shooters.find(
              (shooter) => shooter.shooter_id === contester.shooter_id,
            );
            return (
              <div className={styles['table--row']} key={user.shooter_id}>
                <span className={cx(styles['table--row--element'])}>
                  {user.firstName} {user.secondName}
                </span>
                <span className={cx(styles['table--row--element'])}>
                  <SelectNumber
                    value={contester.shoot_1}
                    handleUpdate={(value) =>
                      handleChangeValue(user, value, 'shoot_1')
                    }
                    currentFocused={currentFocused}
                    setCurrentFocused={setCurrentFocused}
                  />
                </span>
                <span className={cx(styles['table--row--element'])}>
                  <SelectNumber
                    value={contester.shoot_2}
                    handleUpdate={(value) =>
                      handleChangeValue(user, value, 'shoot_2')
                    }
                    currentFocused={currentFocused}
                    setCurrentFocused={setCurrentFocused}
                  />
                </span>
                <span className={cx(styles['table--row--element'])}>
                  <SelectNumber
                    value={contester.shoot_3}
                    handleUpdate={(value) =>
                      handleChangeValue(user, value, 'shoot_3')
                    }
                    currentFocused={currentFocused}
                    setCurrentFocused={setCurrentFocused}
                  />
                </span>
                <span className={cx(styles['table--row--element'])}>
                  <SelectNumber
                    value={contester.shoot_4}
                    handleUpdate={(value) =>
                      handleChangeValue(user, value, 'shoot_4')
                    }
                    currentFocused={currentFocused}
                    setCurrentFocused={setCurrentFocused}
                  />
                </span>
                <span className={cx(styles['table--row--element'])}>
                  <SelectNumber
                    value={contester.shoot_5}
                    handleUpdate={(value) =>
                      handleChangeValue(user, value, 'shoot_5')
                    }
                    currentFocused={currentFocused}
                    setCurrentFocused={setCurrentFocused}
                  />
                </span>
                <span className={cx(styles['table--row--element'])}>
                  <SelectNumber
                    value={contester.shoot_6}
                    handleUpdate={(value) =>
                      handleChangeValue(user, value, 'shoot_6')
                    }
                    currentFocused={currentFocused}
                    setCurrentFocused={setCurrentFocused}
                  />
                </span>
                <span className={cx(styles['table--row--element'])}>
                  <SelectNumber
                    value={contester.shoot_7}
                    handleUpdate={(value) =>
                      handleChangeValue(user, value, 'shoot_7')
                    }
                    currentFocused={currentFocused}
                    setCurrentFocused={setCurrentFocused}
                  />
                </span>
                <span className={cx(styles['table--row--element'])}>
                  <SelectNumber
                    value={contester.shoot_8}
                    handleUpdate={(value) =>
                      handleChangeValue(user, value, 'shoot_8')
                    }
                    currentFocused={currentFocused}
                    setCurrentFocused={setCurrentFocused}
                  />
                </span>
                <span className={cx(styles['table--row--element'])}>
                  <SelectNumber
                    value={contester.shoot_9}
                    handleUpdate={(value) =>
                      handleChangeValue(user, value, 'shoot_9')
                    }
                    currentFocused={currentFocused}
                    setCurrentFocused={setCurrentFocused}
                  />
                </span>
                <span className={cx(styles['table--row--element'])}>
                  <SelectNumber
                    value={contester.shoot_10}
                    handleUpdate={(value) =>
                      handleChangeValue(user, value, 'shoot_10')
                    }
                    currentFocused={currentFocused}
                    setCurrentFocused={setCurrentFocused}
                  />
                </span>
                <span className={cx(styles['table--row--element'])}>
                  {countContesterTens(contester)}
                </span>
                <span className={cx(styles['table--row--element'])}>
                  {sumContesterPoints(contester)}
                </span>
              </div>
            );
          })}
        </div>
        {currentMode ? (
          <div className={styles.totalPoints}>
            <span>Dziesiątki: {getTotalTeamTens()}</span>
            <span>Punkty: {getTotalTeamPoints()}</span>
          </div>
        ) : null}
      </div>

      <div className={styles.valueSelect}>
        {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((n) => (
          <button onClick={() => setValue(n)} key={`valueSelect-${n}`}>
            {n}
          </button>
        ))}
        <button disabled className={styles.disabledButton}></button>
      </div>
    </>
  ) : (
    <h2 className={styles.empty}>
      Brak strzelców {currentMode ? 'w drużynie' : 'indywidualnych'}
    </h2>
  );
}

const forbiddenCharacters = ['.', ',', '+', '-', 'e'];
function SelectNumber({
  value,
  handleUpdate,
  currentFocused,
  setCurrentFocused,
}) {
  const currentElement = useRef(null);
  const handleChange = (e) => {
    let point = Math.floor(e.target.valueAsNumber);

    if (isNaN(point)) return handleUpdate('');

    point = Math.max(0, point);
    point = Math.min(10, point);
    handleUpdate(point);
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text/plain');
    const pastedValue = parseFloat(pastedText);

    if (!isNaN(pastedValue)) {
      const point = Math.floor(pastedValue);
      if (!isNaN(point) && point >= 0 && point <= 10) {
        handleUpdate(point);
      }
    }
  };
  const handleKeyPress = (e) => {
    if (forbiddenCharacters.includes(e.key)) e.preventDefault();
  };

  const handleChangeParser = (e) => {
    handleChange({ target: { valueAsNumber: e.detail.value } });
  };
  useEffect(() => {
    if (!currentElement) return;
    currentElement.current.addEventListener('changeValue', handleChangeParser);
  }, []);

  return (
    <input
      ref={currentElement}
      type="number"
      value={value ?? ''}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      onPaste={handlePaste}
      onFocus={(e) => setCurrentFocused(e.currentTarget)}
      min={0}
      max={10}
      className={cx(styles.selectValue, {
        [styles.selectValue__focused]:
          currentElement.current === currentFocused,
      })}
    />
  );
}
