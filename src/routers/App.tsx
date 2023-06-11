import { AdminPage } from '#/pages/Admin';
import SignIn from '#/pages/Client/SignIn';
import SignUp from '#/pages/Client/SignUp';
import { VerifyCode } from '#/pages/Client/VerifyCode';
import { EventPage } from '#/pages/Client/event';
import { EventDetailPage } from '#/pages/Client/event/EventDetail';
import HomePage from '#/pages/Home';
import ClientLayout from '#/shared/components/layout/ClientLayout';
import { ROLE } from '#/shared/utils/type';
import { useRoutes } from 'react-router-dom';
import GuardRoute from './GuardRoute';
import { DevicePage } from '#/pages/Client/Device';
import { HumanPage } from '#/pages/Client/Human';

const App = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <ClientLayout children={<HomePage></HomePage>} />,
    },
    {
      path: '/sign-in',
      element: (
        <GuardRoute>
          <SignIn />
        </GuardRoute>
      ),
    },
    {
      path: '/sign-up',
      element: <SignUp />,
    },
    {
      path: '/verify-code',
      element: <VerifyCode />,
    },
    {
      path: '/event',
      element: <ClientLayout children={<EventPage />} />,
    },
    {
      path: '/event/:id',
      element: <ClientLayout children={<EventDetailPage />} />,
    },
    {
      path: '/device',
      element: <ClientLayout children={<DevicePage />} />,
    },
    {
      path: '/human-event',
      element: <ClientLayout children={<HumanPage />} />,
    },
    {
      path: '/admin/*',
      element: (
        <GuardRoute
          roles={[ROLE.ADMIN]}
          isPrivate={true}
          children={<AdminPage />}
        />
      ),
    },
  ]);

  return routes;
};

export default App;
