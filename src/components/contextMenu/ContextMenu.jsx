import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import cx from 'classnames';
import styles from './ContextMenu.module.css';
import { useDetectOutsideClick } from '../../hooks/useDetectOutsideClick';
export default function ContextMenu({ options, children }) {
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState('bottom');

  const buttonRef = useRef(null);
  const containerRef = useRef(null);
  const contextRef = useRef(null);

  useDetectOutsideClick(containerRef, () => {
    setActive(false);
  });
  //kiedy focusa nie ma na żadnym z tych elementów musimy zamknąć
  const handleResize = () => {
    if (!active) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const contextRect = contextRef.current.getBoundingClientRect();
    let { width, height } = contextRect;

    const EDGE_OFFSET = 8;
    const TRIANGLE_SIZE = 20;

    const OFFSET_LEFT = buttonRect.left;
    const OFFSET_RIGHT = window.innerWidth - buttonRect.right;
    const OFFSET_TOP = buttonRect.top;
    const OFFSET_BOTTOM = window.innerHeight - buttonRect.bottom;

    width += EDGE_OFFSET;
    height += EDGE_OFFSET;

    if (
      width / 2 <= OFFSET_RIGHT &&
      width / 2 <= OFFSET_LEFT &&
      height + TRIANGLE_SIZE <= OFFSET_BOTTOM
    ) {
      //BOTTOM CENTER
      setPosition('bottom');
      console.log('1');
    } else if (
      width + TRIANGLE_SIZE <= OFFSET_LEFT &&
      height / 2 <= OFFSET_TOP &&
      height / 2 <= OFFSET_BOTTOM
    ) {
      //LEFT CENTER
      setPosition('left');
      console.log('2');
    } else if (
      width + TRIANGLE_SIZE <= OFFSET_RIGHT &&
      height / 2 <= OFFSET_TOP &&
      height / 2 <= OFFSET_BOTTOM
    ) {
      //RIGHT CENTER
      setPosition('right');
      console.log('3');
    } else if (
      width / 2 <= OFFSET_RIGHT &&
      width / 2 <= OFFSET_LEFT &&
      height + TRIANGLE_SIZE <= OFFSET_TOP
    ) {
      //TOP CENTER
      setPosition('top');
      console.log('4');
    } else {
      //! NOT Displaying at all because screen is too small
      setPosition('hide');
    }
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useLayoutEffect(() => {
    handleResize();
  }, [active]);

  return (
    <div className={styles.container} ref={containerRef}>
      {children(() => setActive(!active), buttonRef)}
      <ul
        className={cx(styles.contextMenu, styles[`contextMenu__${position}`], {
          [styles['contextMenu__active']]: active,
        })}
        ref={contextRef}
      >
        {options.map(({ icon, text, action, disabled }) => (
          <li className={styles['contextMenu--element']}>
            <button onClick={action} type="button" disabled={disabled}>
              {icon}
              {text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
