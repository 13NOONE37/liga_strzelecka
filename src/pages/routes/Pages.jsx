import AdminPage from '../admin/AdminPage';
import DashboardPage from '../admin/dashboard/DashboardPage';
import Auth from '../public/Auth/Auth';
import Main from '../public/Main/Main';

const Pages = {
  guestPages: [
    {
      path: '/',
      element: <Main />,
    },
    {
      path: '/auth',
      element: <Auth />,
    },
  ],
  authPages: [
    {
      path: '/admin',
      element: <AdminPage />,
      subPages: [
        {
          path: '/admin/dashboard',
          element: <DashboardPage />,
        },
      ],
    },
  ],
};

export default Pages;
