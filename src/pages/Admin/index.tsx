import { ServiceType } from '#/generated/schemas';
import PrivateLayout from '#/shared/components/layout/PrivateLayout';
import useAuthentication from '#/shared/hooks/useAuthentication';
import {
  FileTextOutlined,
  SettingOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import { Route } from '@ant-design/pro-layout/lib/typings';
import { useRoutes } from 'react-router-dom';
import NotFoundPage from '../404Page';
import { EventManagement } from './EventManagement';
import { EventDetail } from './EventManagement/EventDetail';
import { UpsertEvent } from './EventManagement/UpsertEvent';
import { ServiceManagement } from './ServiceManagement';
import { ServiceDetail } from './ServiceManagement/Detail';
import { UpsertService } from './ServiceManagement/Upsert';

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

      children: [
        {
          index: true,
          element: <EventManagement />,
        },
        {
          path: ':id',
          element: <EventDetail />,
        },
        {
          path: 'create',
          element: <UpsertEvent />,
        },
        {
          path: 'edit/:id',
          element: <UpsertEvent />,
        },
      ],
    },
    {
      path: '/event-request-management',
      element: <div>Event Management Product</div>,
    },
    {
      path: '/service-management/human',
      children: [
        {
          index: true,
          element: <ServiceManagement type={ServiceType.HumanResource} />,
        },
        {
          path: ':id',
          element: <ServiceDetail type={ServiceType.HumanResource} />,
        },
        {
          path: 'create',
          element: <UpsertService type={ServiceType.HumanResource} />,
        },
        {
          path: 'edit/:id',
          element: <UpsertService type={ServiceType.HumanResource} />,
        },
      ],
    },
    {
      path: '/service-management/device',
      children: [
        {
          index: true,
          element: <ServiceManagement type={ServiceType.Device} />,
        },
        {
          path: ':id',
          element: <ServiceDetail type={ServiceType.Device} />,
        },
        {
          path: 'create',
          element: <UpsertService type={ServiceType.Device} />,
        },
        {
          path: 'edit/:id',
          element: <UpsertService type={ServiceType.Device} />,
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
