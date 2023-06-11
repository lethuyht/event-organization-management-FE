import PrivateLayout from '#/shared/components/layout/PrivateLayout';
import useAuthentication from '#/shared/hooks/useAuthentication';
import {
  FileTextOutlined,
  SettingOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import { useRoutes } from 'react-router-dom';
import NotFoundPage from '../404Page';
import { Route } from '@ant-design/pro-layout/lib/typings';

export function AdminPage() {
  const { handleLogout } = useAuthentication();
  const customMenus: Route = {
    path: '/admin',
    routes: [
      {
        path: '/admin/contract-management',
        name: 'Quản lý hợp đồng',
        icon: <FileTextOutlined />,
        key: '/admin/contract-management',
      },
      {
        path: '/admin/event-request-management',
        name: 'Quản lý yêu cầu sự kiện',
        icon: <SolutionOutlined />,
        key: '/admin/event-request-management',
      },
      {
        path: '/admin/event-management',
        name: 'Quản lý sự kiện',
        icon: <SettingOutlined />,
        key: '/admin/event-management',
      },
      {
        name: 'Quản lý dịch vụ',
        icon: <SettingOutlined />,
        path: '/admin/service-management',
        routes: [
          {
            path: 'device',
            name: 'Quản lý  thiết bị',
            icon: <SettingOutlined />,
            parentKeys: ['/admin/service-management'],
          },
          {
            path: 'human',
            name: 'Quản lý  nhân sự',
            icon: <SettingOutlined />,
            parentKeys: ['/admin/service-management'],
          },
        ],
      },
    ],
  };

  const routes = useRoutes([
    {
      path: '/event-management',
      element: <div>Event Management Product</div>,
    },
    {
      path: '/event-request-management',
      element: <div>Event Management Product</div>,
    },
    {
      path: '/service-management',
      children: [
        {
          path: '/service-management/device',
          element: <div>Device Management</div>,
        },
        {
          path: '/service-management/human',
          element: <div>Human Management</div>,
        },
      ],
    },

    {
      path: '/contract-management',
      element: <div>Contract Management</div>,
    },
    { path: '*', element: <NotFoundPage /> },
  ]);
  return (
    <PrivateLayout logout={handleLogout} routes={customMenus}>
      {routes}
    </PrivateLayout>
  );
}
