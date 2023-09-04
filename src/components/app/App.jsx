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
import fetchData from '../../utils/fetchData';

function App() {
  axios.defaults.withCredentials = true; //We need to enable it for session support

  const [isLogged, setIsLogged] = useState(null);
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
              {Pages.guestPages.map((page1) => {
                return (
                  <Route
                    path={page1.path}
                    element={page1.element}
                    key={page1.path}
                  >
                    {page1.subPages?.map((page2) => (
                      <Route
                        path={`${page1.path}${page2.path}`}
                        element={page2.element}
                        key={`${page1.path}${page2.path}`}
                      >
                        {page2.subPages?.map((page3) => (
                          <Route
                            path={`${page1.path}${page2.path}${page3.path}`}
                            element={page3.element}
                            key={`${page1.path}${page2.path}${page3.path}`}
                          />
                        ))}
                      </Route>
                    ))}
                  </Route>
                );
              })}
            </Route>
            <Route path="/" element={<AuthRoute />}>
              {Pages.authPages.map((page1) => {
                return (
                  <Route
                    path={page1.path}
                    element={page1.element}
                    key={page1.path}
                  >
                    {page1.subPages.map((page2) => (
                      <Route
                        path={`${page1.path}${page2.path}`}
                        element={page2.element}
                        key={`${page1.path}${page2.path}`}
                      >
                        {page2.subPages?.map((page3) => (
                          <Route
                            path={`${page1.path}${page2.path}${page3.path}`}
                            element={page3.element}
                            key={`${page1.path}${page2.path}${page3.path}`}
                          />
                        ))}
                      </Route>
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
