import AdminPage from '../admin/AdminPage';
import ContestsPage from '../admin/contests/ContestsPage';
import HelpPage from '../admin/help/HelpPage';
import ManagmentPage from '../admin/managment/ManagmentPage';
import PodiumPage from '../admin/managment/podium/PodiumPage';
import TeamsPage from '../admin/managment/teams/TeamsPage';
import ResultsPage from '../admin/managment/results/ResultsPage';

import SchoolsPage from '../admin/schools/SchoolsPage';
import ShootersPage from '../admin/shooters/ShootersPage';
import Auth from '../public/Auth/Auth';
import Main from '../public/Main/Main';
import ShootersArchivePage from '../admin/shootersArchive/ShootersArchivePage';

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
        { path: '/contests', element: <ContestsPage /> },
        {
          path: '/contests/managment',
          element: <ManagmentPage />,
          subPages: [
            {
              path: '/teams/:id?',
              element: <TeamsPage />,
            },
            {
              path: '/results/:id?',
              element: <ResultsPage />,
            },
            {
              path: '/podium/:id?',
              element: <PodiumPage />,
            },
          ],
        },
        {
          path: '/shooters',
          element: <ShootersPage />,
        },
        {
          path: '/archive',
          element: <ShootersArchivePage />,
        },
        {
          path: '/schools',
          element: <SchoolsPage />,
        },
        // {
        //   path: '/help',
        //   element: <HelpPage />,
        // },
      ],
    },
  ],
};

export default Pages;
