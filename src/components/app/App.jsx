import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import { useState } from 'react';
import GlobalContext from '../../store/GlobalContext';
import AuthRoute from '../../pages/routes/AuthRoute';
import GuestRoute from '../../pages/routes/GuestRoute';
import Pages from '../../pages/routes/pages';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isLogged, setIsLogged] = useState(true);
  const [theme, setTheme] = useState(
    window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'lightMode'
      : 'darkMode',
  );
  return (
    <div className={theme}>
      <GlobalContext.Provider
        value={{
          isLogged,
          setIsLogged,
          theme,
          setTheme,
        }}
      >
        {/* second context will be in dashboard parent element to be only in admin mode */}
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
