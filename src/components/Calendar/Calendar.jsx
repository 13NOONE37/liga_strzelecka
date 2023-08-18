import React, { useEffect, useReducer, useState } from 'react';
import styles from './Calendar.module.css';
import classNames from 'classnames';
import { ReactComponent as DownIcon } from '../../assets/icons/arrow_drop_down.svg';
import DefaultButton from '../button/Button';

const DAYS_NAMES = [
  'Poniedziałek',
  'Wtorek',
  'Środa',
  'Czwartek',
  'Piątek',
  'Sobota',
  'Niedziela',
];
const MONTH_NAMES = [
  'Styczeń',
  'Luty',
  'Marzec',
  'Kwiecień',
  'Maj',
  'Czerwiec',
  'Lipiec',
  'Sierpień',
  'Wrzesień',
  'Październik',
  'Listopad',
  'Grudzień',
];
export default function Calendar({
  initRenderYear,
  initRenderMonth,
  selectedYear,
  selectedMonth,
  selectedDay,
  setDate,
}) {
  const date = new Date();
  const [dateState, setDateState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      renderYear: date.getFullYear(),
      renderMonth: date.getMonth(),
    },
  );
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const getDayIndex = (year, month, day) => new Date(year, month, day).getDay();
  const getDayName = (index) => DAYS_NAMES.at(index - 1);
  const getMonthName = (month) => MONTH_NAMES[month];

  const handleMove = (goUp) => {
    const DIRECTION = goUp ? -1 : 1;

    if (
      (DIRECTION === -1 && dateState.renderMonth === 0) ||
      (DIRECTION === 1 && dateState.renderMonth === 11)
    ) {
      setDateState({ renderYear: dateState.renderYear + DIRECTION });
    }
    const prevMonth = (dateState.renderMonth + DIRECTION + 12) % 12;
    setDateState({ renderMonth: prevMonth });
  };

  const generateCalendarDays = (year, month, day) => {
    const days = Array(42);

    let firstDayIndex = getDayIndex(year, month, day);
    if (firstDayIndex === 0) firstDayIndex = 7;
    const monthLength = getDaysInMonth(year, month);

    let firstDay = new Date(year, month, day - firstDayIndex + 1);
    for (let i = 0; i < days.length; i++) {
      days[i] = {
        year: firstDay.getFullYear(),
        month: firstDay.getMonth(),
        day: firstDay.getDate(),
        isGrey: false,
      };
      if (i < firstDayIndex - 1 || i > firstDayIndex - 1 + monthLength - 1) {
        days[i].isGrey = true;
      }
      const nextDay = new Date(firstDay);
      nextDay.setDate(firstDay.getDate() + 1);
      firstDay = nextDay;
    }
    return days;
  };

  useEffect(() => {
    console.log(initRenderYear, initRenderMonth);
    setDateState({
      renderYear: initRenderYear,
      renderMonth: initRenderMonth,
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles['controls--date']}>
          {getMonthName(dateState.renderMonth)} {dateState.renderYear}
        </div>
        <div className={styles.switchers}>
          <div className={styles['switchers--up']}>
            <button type="button" onClick={() => handleMove(true)}>
              <DownIcon />
            </button>
          </div>
          <div className={styles['switchers--down']}>
            <button type="button" onClick={() => handleMove(false)}>
              <DownIcon />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.names}>
        {DAYS_NAMES.map((day) => (
          <span>{day.slice(0, 3)}</span>
        ))}
      </div>
      <div className={styles.days}>
        {generateCalendarDays(
          dateState.renderYear,
          dateState.renderMonth,
          1,
        ).map(({ year, month, day, isGrey }) => (
          <button
            type="button"
            className={classNames(styles['days--day'], {
              [styles['days--day__grey']]: isGrey,
              [styles['days--day__currentSelected']]:
                day === selectedDay &&
                month === selectedMonth &&
                year === selectedYear,
            })}
            onClick={() => setDate(year, month, day)}
            key={`${year}-${month}-${day}`}
          >
            {day}
          </button>
        ))}
      </div>
      <div className={styles['selectedDate']}>
        Wybrano:{' '}
        {`${getDayName(
          getDayIndex(selectedYear, selectedMonth, selectedDay),
        )}, ${selectedDay} ${getMonthName(selectedMonth)} ${selectedYear}`}
      </div>
    </div>
  );
}
{
  /**
   * 
   * import React, { useReducer, useState } from 'react';
import styles from './Calendar.module.css';
import classNames from 'classnames';
import { ReactComponent as DownIcon } from '../../assets/icons/arrow_drop_down.svg';
import DefaultButton from '../button/Button';

const DAYS_NAMES = [
  'Poniedziałek',
  'Wtorek',
  'Środa',
  'Czwartek',
  'Piątek',
  'Sobota',
  'Niedziela',
];
const MONTH_NAMES = [
  'Styczeń',
  'Luty',
  'Marzec',
  'Kwiecień',
  'Maj',
  'Czerwiec',
  'Lipiec',
  'Sierpień',
  'Wrzesień',
  'Październik',
  'Listopad',
  'Grudzień',
];
export default function Calendar({ setDate }) {
  const date = new Date();
  const [dateState, setDateState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      currentYear: date.getFullYear(),
      currentMonth: date.getMonth(),
      currentDay: date.getDate(),
      selectedYear: date.getFullYear(),
      selectedMonth: date.getMonth(),
      selectedDay: date.getDate(),

      renderYear: date.getFullYear(),
      renderMonth: date.getMonth(),
    },
  );
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const getDayIndex = (year, month, day) => new Date(year, month, day).getDay();
  const getDayName = (index) => DAYS_NAMES.at(index - 1);
  const getMonthName = (month) => MONTH_NAMES[month];

  const handleReset = () =>
    setDateState({
      currentYear: date.getFullYear(),
      currentMonth: date.getMonth(),
      currentDay: date.getDate(),
      selectedYear: date.getFullYear(),
      selectedMonth: date.getMonth(),
      selectedDay: date.getDate(),

      renderYear: date.getFullYear(),
      renderMonth: date.getMonth(),
    });
  setDate(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);

  const handleMove = (goUp) => {
    const DIRECTION = goUp ? -1 : 1;

    if (
      (DIRECTION === -1 && dateState.renderMonth === 0) ||
      (DIRECTION === 1 && dateState.renderMonth === 11)
    ) {
      setDateState({ renderYear: dateState.renderYear + DIRECTION });
    }
    const prevMonth = (dateState.renderMonth + DIRECTION + 12) % 12;
    setDateState({ renderMonth: prevMonth });
  };
  const handleChange = (year, month, day) => {
    setDateState({
      selectedYear: year,
      selectedMonth: month,
      selectedDay: day,
    });
    setDate(`${year}-${month}-${day}`);
  };
  const generateCalendarDays = (year, month, day) => {
    const days = Array(42);

    let firstDayIndex = getDayIndex(year, month, day);
    if (firstDayIndex === 0) firstDayIndex = 7;
    const monthLength = getDaysInMonth(year, month);

    let firstDay = new Date(year, month, day - firstDayIndex + 1);
    for (let i = 0; i < days.length; i++) {
      days[i] = {
        year: firstDay.getFullYear(),
        month: firstDay.getMonth(),
        day: firstDay.getDate(),
        isGrey: false,
      };
      if (i < firstDayIndex - 1 || i > firstDayIndex - 1 + monthLength - 1) {
        days[i].isGrey = true;
      }
      const nextDay = new Date(firstDay);
      nextDay.setDate(firstDay.getDate() + 1);
      firstDay = nextDay;
    }
    return days;
  };

  return (
    <div className={styles.container}>
      <div className={styles['today']}>
        Dzisiaj jest
        <DefaultButton
          style={'text'}
          size={'medium'}
          text={`${getDayName(
            getDayIndex(
              dateState.currentYear,
              dateState.currentMonth,
              dateState.currentDay,
            ),
          )}, ${dateState.currentDay} ${getMonthName(dateState.currentMonth)}`}
          onClick={handleReset}
        />
      </div>
      <div className={styles.controls}>
        <div className={styles['controls--date']}>
          {getMonthName(dateState.renderMonth)} {dateState.renderYear}
        </div>
        <div className={styles.switchers}>
          <div className={styles['switchers--up']}>
            <button onClick={() => handleMove(true)}>
              <DownIcon />
            </button>
          </div>
          <div className={styles['switchers--down']}>
            <button onClick={() => handleMove(false)}>
              <DownIcon />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.names}>
        {DAYS_NAMES.map((day) => (
          <span>{day.slice(0, 3)}</span>
        ))}
      </div>
      <div className={styles.days}>
        {generateCalendarDays(
          dateState.renderYear,
          dateState.renderMonth,
          1,
        ).map(({ year, month, day, isGrey }) => (
          <button
            className={classNames(styles['days--day'], {
              [styles['days--day__grey']]: isGrey,
              [styles['days--day__currentDay']]:
                day === dateState.currentDay &&
                month === dateState.currentMonth &&
                year === dateState.currentYear,
              [styles['days--day__currentSelected']]:
                day === dateState.selectedDay &&
                month === dateState.selectedMonth &&
                year === dateState.selectedYear,
            })}
            onClick={() => handleChange(year, month, day)}
            key={`${year}-${month}-${day}`}
          >
            {day}
          </button>
        ))}
      </div>
      <div className={styles['selectedDate']}>
        Wybrano:{' '}
        {`${getDayName(
          getDayIndex(
            dateState.selectedYear,
            dateState.selectedMonth,
            dateState.selectedDay,
          ),
        )}, ${dateState.selectedDay} ${getMonthName(dateState.selectedMonth)} ${
          dateState.selectedYear
        }`}
      </div>
    </div>
  );
}

   * 
   */
}
