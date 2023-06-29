import React, { useState } from 'react';

import styles from './Auth.module.css';
import Logo from '../../../assets/Logo.png';
import Input from '../../../components/input/Input';
import { ReactComponent as Visibility } from '../../../assets/icons/visibility.svg';
import { ReactComponent as VisibilityOff } from '../../../assets/icons/visibility_off.svg';
import { ReactComponent as ArrowIcon } from '../../../assets/icons/arrow_circle_right.svg';
import DefaultButton, { IconButton } from '../../../components/button/Button';
export default function Auth() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const [login, setlogin] = useState('');
  const [password, setpassword] = useState('');
  const [isVisible, setisVisible] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.loginPanel}>
        <form onSubmit={handleSubmit}>
          <DefaultButton
            text={'Button'}
            icon={<ArrowIcon />}
            iconPosition={'left'}
            style={'secondary'}
            // disabled={true}
          />
          <DefaultButton
            text={'Button'}
            icon={<ArrowIcon />}
            iconPosition={'left'}
            style={'text'}
            // disabled={true}
            isLoading={true}
          />
          <DefaultButton
            text={'Button'}
            icon={<ArrowIcon />}
            isLoading={true}
            // disabled={true}
            iconPosition={'right'}
          />
          <DefaultButton text={'Button'} isLoading={true} />
          <IconButton icon={<ArrowIcon />} isLoading={!true} disabled={true} />
          <IconButton
            icon={<ArrowIcon />}
            style={'secondary'}
            isLoading={!true}
            disabled={true}
          />
          <Input
            heading="Podaj login"
            type={'text'}
            placeholder="Login"
            value={login}
            onChange={(e) => setlogin(e.target.value)}
            status="warning"
            statusMessage="Wpisz poprawny adres email"
          />
          <Input
            heading="Podaj hasło"
            icon={
              isVisible ? (
                <button
                  onClick={() => setisVisible(false)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <Visibility
                    style={{ fill: 'white', width: '25px', height: '25px' }}
                  />
                </button>
              ) : (
                <button
                  onClick={() => setisVisible(true)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <VisibilityOff
                    style={{ fill: 'white', width: '25px', height: '25px' }}
                  />
                </button>
              )
            }
            iconPosition="right" // or left
            type={isVisible ? 'text' : 'password'}
            placeholder="Hasło"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            // status={null}
            // statusMessage={null}
            status="error"
            statusMessage="To pole nie może być puste"
            disabled={true}
          />
          <Input
            heading="Podaj hasło"
            icon={
              isVisible ? (
                <button
                  onClick={() => setisVisible(false)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <Visibility
                    style={{ fill: 'white', width: '25px', height: '25px' }}
                  />
                </button>
              ) : (
                <button
                  onClick={() => setisVisible(true)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <VisibilityOff
                    style={{ fill: 'white', width: '25px', height: '25px' }}
                  />
                </button>
              )
            }
            iconPosition="right" // or left
            type={isVisible ? 'text' : 'password'}
            placeholder="Hasło"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            // status={null}
            // statusMessage={null}
            status="success"
            statusMessage="Daro daro byku to mój rok idę teraz po wygraną!🦁🦁🦁"
          />
        </form>
      </div>
      <div className={styles.imagePanel}>
        {/* <img src={Logo} alt="Logo szkolnej ligi strzeleckiej" />
        <h2>Witaj na stronie szkolnej ligi strzeleckiej</h2> */}
      </div>
    </div>
  );
}
