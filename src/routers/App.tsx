import { ServiceType } from '#/generated/schemas';
import { AdminPage } from '#/pages/Admin';
import UpdateProfile from '#/pages/Client/Profile/UpdateProfile';
import { Service } from '#/pages/Client/Service';
import { ServiceDetailPage } from '#/pages/Client/Service/ServiceDetail';
import SignIn from '#/pages/Client/SignIn';
import SignUp from '#/pages/Client/SignUp';
import { VerifyCode } from '#/pages/Client/VerifyCode';
import { EventPage } from '#/pages/Client/event';
import { EventDetailPage } from '#/pages/Client/event/EventDetail';
import HomePage from '#/pages/Home';
import ClientLayout from '#/shared/components/layout/ClientLayout';
import { ROLE } from '#/shared/utils/type';
import { useRoutes } from 'react-router';
import GuardRoute from './GuardRoute';
import { Cart } from '#/pages/Client/Cart';
import { MyContract } from '#/pages/Client/Contract';
import MyContractDetail from '#/pages/Client/Contract/ContractDetail';

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
      path: '/profile',
      element: (
        <GuardRoute
          roles={[ROLE.ADMIN, ROLE.USER]}
          isPrivate={true}
          children={<ClientLayout children={<UpdateProfile />} />}
        />
      ),
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
      element: (
        <ClientLayout children={<Service type={ServiceType.Device} />} />
      ),
    },
    {
      path: '/device/:id',
      element: (
        <ClientLayout
          children={<ServiceDetailPage type={ServiceType.Device} />}
        />
      ),
    },
    {
      path: '/human-event',
      element: (
        <ClientLayout children={<Service type={ServiceType.HumanResource} />} />
      ),
    },
    {
      path: '/human-event/:id',
      element: (
        <ClientLayout
          children={<ServiceDetailPage type={ServiceType.HumanResource} />}
        />
      ),
    },
    {
      path: 'cart',
      element: (
        <GuardRoute
          roles={[ROLE.USER]}
          isPrivate={true}
          children={<ClientLayout children={<Cart />} />}
        />
      ),
    },
    {
      path: '/contract-management',
      element: (
        <GuardRoute
          roles={[ROLE.USER]}
          isPrivate={true}
          children={<ClientLayout children={<MyContract />} />}
        />
      ),
    },
    {
      path: '/contract-management/:id',
      element: (
        <GuardRoute
          roles={[ROLE.USER]}
          isPrivate={true}
          children={<ClientLayout children={<MyContractDetail />} />}
        />
      ),
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
