import SignIn from '#/pages/Client/SignIn';
import SignUp from '#/pages/Client/SignUp';
import ClientLayout from '#/shared/components/layout/ClientLayout';
import { useRoutes } from 'react-router-dom';
import GuardRoute from './GuardRoute';
import { VerifyCode } from '#/pages/Client/VerifyCode';

const App = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <ClientLayout children={<>Hello</>} />,
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
  ]);

  return routes;
};

export default App;
