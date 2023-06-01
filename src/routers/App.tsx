import ClientLayout from '#/shared/components/layout/ClientLayout';
import { useRoutes } from 'react-router-dom';

const App = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <ClientLayout children={<>Hello</>} />,
    },
  ]);

  return routes;
};

export default App;
