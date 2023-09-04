import { useContext } from 'react';
import GlobalContext from '../../store/GlobalContext';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

export default function GuestRoute() {
  const { isLogged } = useContext(GlobalContext);
  if (isLogged == null)
    return (
      <div style={{ backgroundColor: '#222131', height: '100vh' }}>
        <Loader />
      </div>
    );
  return !isLogged ? <Outlet /> : <Navigate to={'/admin/contests'} />;
}
