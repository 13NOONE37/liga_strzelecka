import { useContext } from 'react';
import GlobalContext from '../../store/GlobalContext';
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthRoute() {
  const { isLogged } = useContext(GlobalContext);
  if (isLogged == null) return <span>...loading</span>;
  return isLogged ? <Outlet /> : <Navigate to={'/'} />;
}
