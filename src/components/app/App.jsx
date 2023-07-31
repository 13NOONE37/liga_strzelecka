import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import { useState } from 'react';
import GlobalContext from '../../store/GlobalContext';
import AuthRoute from '../../pages/routes/AuthRoute';
import GuestRoute from '../../pages/routes/GuestRoute';
import Pages from '../../pages/routes/pages';
import { AnimatePresence } from 'framer-motion';
import useSession from '../../utils/endpoints/useSession';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

function App() {
  axios.defaults.withCredentials = true; //We need to enable it for session support

  const [isLogged, setIsLogged] = useState(false);
  const [theme, setTheme] = useState('darkMode');
  const [userInfo, setUserInfo] = useState(null);
  // const [theme, setTheme] = useState(
  //   window.matchMedia &&
  //     window.matchMedia('(prefers-color-scheme: light)').matches
  //     ? 'lightMode'
  //     : 'darkMode',
  // );

  useSession(setIsLogged, setUserInfo);

  return (
    <div className={theme}>
      <GlobalContext.Provider
        value={{
          isLogged,
          setIsLogged,
          theme,
          setTheme,
          userInfo,
          setUserInfo,
        }}
      >
        {/* second context will be in dashboard parent element to be only in admin mode */}
        <ToastContainer
          position="bottom-center"
          hideProgressBar={false}
          closeOnClick={true}
          draggable={true}
          pauseOnHover={true}
          newestOnTop
          theme={'dark'}
        />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="*" element={<h2>Not found</h2>} />
            <Route path="/" element={<GuestRoute />}>
              {Pages.guestPages.map(({ path, element, subPages }) => {
                return (
                  <Route path={path} element={element} key={path}>
                    {subPages?.map(({ path, element }) => (
                      <Route path={path} element={element} key={path} />
                    ))}
                  </Route>
                );
              })}
            </Route>
            <Route path="/" element={<AuthRoute />}>
              {Pages.authPages.map(({ path, element, subPages }) => {
                return (
                  <Route path={path} element={element} key={path}>
                    {subPages.map(({ path, element }) => (
                      <Route path={path} element={element} key={path} />
                    ))}
                  </Route>
                );
              })}
            </Route>
          </Routes>
        </AnimatePresence>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
