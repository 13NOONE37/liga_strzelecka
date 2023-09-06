import React, { useContext, useRef, useState } from 'react';
import styles from './AdminSidebar.module.css';
import cx from 'classnames';
import { ReactComponent as Swords } from '../../assets/icons/swords.svg';
import { ReactComponent as School } from '../../assets/icons/school.svg';
import { ReactComponent as Face } from '../../assets/icons/face.svg';
import { ReactComponent as Timeline } from '../../assets/icons/timeline.svg';
import { ReactComponent as Logout } from '../../assets/icons/logout.svg';
import { ReactComponent as Help } from '../../assets/icons/help.svg';
import { ReactComponent as LocationAway } from '../../assets/icons/location_away.svg';
import DefaultButton, { IconButton } from '../button/Button';
import { NavLink, useLocation } from 'react-router-dom';
import useLogout from '../../utils/endpoints/useLogout';
import GlobalContext from '../../store/GlobalContext';

export default function AdminSidebar() {
  const { setIsLogged, setUserInfo, userInfo } = useContext(GlobalContext);
  const defaultPathname = useLocation().pathname;
  const SIDEBAR_ELEMENTS = [
    // {
    //   path: '/admin/results',
    //   name: 'Wyniki',
    //   icon: <Timeline />,
    // },
    {
      path: '/admin/contests',
      name: 'Zawody',
      icon: <Swords />,
    },
    {
      path: '/admin/shooters',
      name: 'Strzelcy',
      icon: <Face />,
    },
    {
      path: '/admin/archive',
      name: 'Archiwum strzelców',
      icon: <LocationAway />,
    },
    {
      path: '/admin/schools',
      name: 'Szkoły',
      icon: <School />,
    },
    // {
    //   path: '/admin/help',
    //   name: 'Pomoc',
    //   icon: <Help />,
    // },
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
        {userInfo && <h3>Witaj {userInfo.login}</h3>}
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
                    defaultPathname.includes(item.path),
                })}
              >
                {item.icon}
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
          icon={<Logout />}
          iconPosition={'right'}
          size={'medium'}
          action={() => {
            useLogout(setIsLogged, setUserInfo);
          }}
        />
      </div>
    </aside>
  );
}
