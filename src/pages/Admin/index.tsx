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
import { ContractAdminPage } from './Contract';
import { ContractDetail } from './Contract/Detail';
import { StatisticPage } from '#/pages/Admin/Statistic';

export function AdminPage() {
  const { handleLogout } = useAuthentication();
  const customMenus: Route = {
    path: '/admin',
    routes: [
      {
        path: '/admin/statistic',
        name: 'Thống kê',
        icon: <SolutionOutlined />,
        key: '/admin/statistic',
      },
      {
        path: '/admin/contract-management',
        name: 'Quản lý hợp đồng',
        icon: <FileTextOutlined />,
        key: '/admin/contract-management',
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
      path: '/statistic',
      children: [
        {
          index: true,
          element: <StatisticPage />,
        },
      ],
    },
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
      children: [
        {
          index: true,
          element: <ContractAdminPage />,
        },
        {
          path: ':id',
          element: <ContractDetail />,
        },
      ],
    },
    { path: '*', element: <NotFoundPage /> },
  ]);
  return (
    <PrivateLayout logout={handleLogout} routes={customMenus}>
      {routes}
    </PrivateLayout>
  );
}
