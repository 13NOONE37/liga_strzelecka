import { createContext } from 'react';

const GlobalContext = createContext({
  isLogged: null,
  setIsLogged: () => {},
  theme: null,
  setTheme: () => {},
});
export default GlobalContext;
