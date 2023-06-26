import React, { useRef, useState } from 'react';
import styles from './AdminSidebar.module.css';
import cx from 'classnames';
import { ReactComponent as Trophy } from '../../assets/icons/trophy.svg';
import { ReactComponent as School } from '../../assets/icons/school.svg';
import { ReactComponent as Face } from '../../assets/icons/face.svg';
import { ReactComponent as Timeline } from '../../assets/icons/timeline.svg';
import { ReactComponent as Logout } from '../../assets/icons/logout.svg';
import { ReactComponent as Help } from '../../assets/icons/help.svg';
import DefaultButton, { IconButton } from '../button/Button';
import { NavLink, useLocation } from 'react-router-dom';

export default function AdminSidebar() {
  const defaultPathname = useLocation().pathname;
  const SIDEBAR_ELEMENTS = [
    {
      path: '/admin/results',
      name: 'Wyniki',
      Icon: () => <Timeline />,
    },
    {
      path: '/admin/competitions',
      name: 'Zawody',
      Icon: () => <Trophy />,
    },
    {
      path: '/admin/shooters',
      name: 'Strzelcy',
      Icon: () => <Face />,
    },
    {
      path: '/admin/schools',
      name: 'Szkoły',
      Icon: () => <School />,
    },
    {
      path: '/admin/help',
      name: 'Pomoc',
      Icon: () => <Help />,
    },
  ];

  const HEIGHT = 62; //it's height of one li element, we need this to move indicator
  const [topOffset, setTopOffset] = useState(
    Math.max(
      0,
      SIDEBAR_ELEMENTS.findIndex((e) => e.path === defaultPathname),
    ) * HEIGHT,
  );

  const listRef = useRef(null);
  const handleActive = (e, n) => {
    const elements = listRef.current.querySelectorAll('li a');
    elements.forEach((element) => {
      element.classList.remove(styles['sidebar--nav--link__active']);
    });
    e.target.classList.add(styles['sidebar--nav--link__active']);

    setTopOffset(n * HEIGHT);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles['sidebar--welcome']}>
        <h3>Witaj, {`Oliwer`}</h3>
      </div>
      <nav className={styles['sidebar--nav']}>
        <ul ref={listRef}>
          {SIDEBAR_ELEMENTS.map((item, index) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={(e) => handleActive(e, index)}
                className={cx(styles['sidebar--nav--link'], {
                  [styles['sidebar--nav--link__active']]:
                    item.path === defaultPathname,
                })}
              >
                <item.Icon />
                {item.name}
              </NavLink>
            </li>
          ))}

          <div
            className={styles['sidebar--nav--incidactor']}
            style={{ translate: `0 ${topOffset}px` }}
          ></div>
        </ul>
      </nav>

      <div className={styles['sidebar--userInfo']}>
        {/* Theme toggle */}

        <DefaultButton
          text={'Wyloguj się'}
          style={'text'}
          Icon={() => <Logout />}
          iconPosition={'right'}
          size={'medium'}
          action={() => {}}
        />
      </div>
    </aside>
  );
}
