import { createContext } from 'react';

const GlobalContext = createContext({
  isLogged: null,
  setIsLogged: () => {},
  theme: null,
  setTheme: () => {},
  userInfo: null,
  setUserInfo: () => {},
});
export default GlobalContext;
