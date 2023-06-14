import HomePage from "#/pages/Home";
import ClientLayout from "#/shared/components/layout/ClientLayout";
import { useRoutes } from "react-router";
import GuardRoute from "./GuardRoute";
import SignIn from "#/pages/Client/SignIn";
import SignUp from "#/pages/Client/SignUp";
import { VerifyCode } from "#/pages/Client/VerifyCode";
import { EventPage } from "#/pages/Client/event";
import { EventDetailPage } from "#/pages/Client/event/EventDetail";
import { DevicePage } from "#/pages/Client/Device";
import { DeviceDetailPage } from "#/pages/Client/Device/DeviceDetail";
import { HumanPage } from "#/pages/Client/Human";
import { ROLE } from "#/shared/utils/type";
import { AdminPage } from "#/pages/Admin";


const App = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <ClientLayout children={<HomePage />} />,
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
      path: '/device/:id',
      element: <ClientLayout children={<DeviceDetailPage />} />,
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
