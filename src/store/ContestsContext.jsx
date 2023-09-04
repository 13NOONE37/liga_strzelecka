import { createContext } from 'react';

const ContestsContext = createContext({
  teams: null,
  setTeams: () => {},
  contesters: null,
  setContesters: () => {},
  contestId: null,
});
export default ContestsContext;
