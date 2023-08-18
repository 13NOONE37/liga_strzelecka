import AdminPage from '../admin/AdminPage';
import ContestsPage from '../admin/contests/ContestsPage';
import DashboardPage from '../admin/dashboard/DashboardPage';
import HelpPage from '../admin/help/HelpPage';
import ResultsPage from '../admin/results/ResultsPage';
import SchoolsPage from '../admin/schools/SchoolsPage';
import ShootersPage from '../admin/shooters/ShootersPage';
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
        {
          path: '/admin/results',
          element: <ResultsPage />,
        },
        {
          path: '/admin/contests',
          element: <ContestsPage />,
        },
        {
          path: '/admin/shooters',
          element: <ShootersPage />,
        },
        {
          path: '/admin/schools',
          element: <SchoolsPage />,
        },
        {
          path: '/admin/help',
          element: <HelpPage />,
        },
      ],
    },
  ],
};

export default Pages;
