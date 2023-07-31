import React, { useContext, useState } from 'react';

import styles from './Auth.module.css';
import Logo from '../../../assets/Logo.png';
import { ReactComponent as DashboardPicture } from '../../../assets/dashboard.svg';

import Input from '../../../components/input/Input';
import DefaultButton from '../../../components/button/Button';
import { Formik } from 'formik';
import ShowPasswordButton from '../../../components/button/RTUComponents/ShowPasswordButton';
import GlobalContext from '../../../store/GlobalContext';
import fetchData from '../../../utils/fetchData';
export default function Auth() {
  const { setIsLogged, setUserInfo } = useContext(GlobalContext);
  const [isVisible, setIsVisible] = useState(false);

  const formInitialValues = {
    login: '',
    password: '',
  };
  const handleValidate = (values) => {
    const errors = {};
    if (!values.login) {
      errors.login = {
        status: 'warning',
        message: 'Login jest wymagany',
      };
    }
    if (!values.password) {
      errors.password = {
        status: 'warning',
        message: 'Hasło jest wymagane',
      };
    }
    return errors;
  };
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const { data, status } = await fetchData({
        action: 'auth',
        login: values.login,
        password: values.password,
      });

      if (status === 200) {
        setIsLogged(true);
        setUserInfo(data.data);
      }
    } catch (error) {
      const status = error?.response?.status === 401;
      let message = status
        ? 'Podany login lub hasło jest błędne'
        : 'Coś poszło nie tak. Spróbuj ponownie.';

      setErrors({
        login: {
          status: 'error__noicon',
          message: '',
        },
        password: {
          status: 'error',
          message: message,
        },
      });
    }

    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginPanel}>
        <Formik
          initialValues={formInitialValues}
          validate={handleValidate}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form
              onSubmit={handleSubmit}
              className={styles['loginPanel--form']}
            >
              <img src={Logo} alt="Logo szkolnej ligi strzeleckiej" />

              <h1 className={styles.heading}>Zaloguj się</h1>
              <Input
                heading="Podaj login"
                type={'text'}
                placeholder="Login"
                name={'login'}
                value={values.login}
                onChange={handleChange}
                status={touched.login && errors.login?.status}
                statusMessage={errors.login?.message}
              />
              <Input
                heading="Podaj hasło"
                icon={
                  <ShowPasswordButton
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                  />
                }
                iconPosition="right"
                type={isVisible ? 'text' : 'password'}
                placeholder="Hasło"
                name={'password'}
                value={values.password}
                onChange={handleChange}
                status={touched.password && errors.password?.status}
                statusMessage={errors.password?.message}
              />
              <div className={styles['loginPanel--submit']}>
                <DefaultButton
                  text={'Zaloguj się'}
                  type={'submit'}
                  isLoading={isSubmitting}
                />
              </div>
            </form>
          )}
        </Formik>
      </div>
      <div className={styles.imagePanel}>
        <DashboardPicture />
      </div>
    </div>
  );
}
