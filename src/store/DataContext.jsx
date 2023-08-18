import { createContext } from 'react';

const DataContext = createContext({
  schools: null,
  setSchools: () => {},
  shooters: null,
  setShooters: () => {},
  contests: null,
  setContests: () => {},
});
export default DataContext;
