import { createContext } from 'react';

const DataContext = createContext({
  schools: null,
  setSchools: () => {},
  shooters: null,
  setShooters: () => {},
});
export default DataContext;
