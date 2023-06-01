import { LogoShortSVG, LogoSVG } from '#/assets/svg';

import ProLayout from '@ant-design/pro-layout';
import { Route } from '@ant-design/pro-layout/lib/typings';

import { Alert } from 'antd';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import RightContentHeader from './RightContentHeader';

interface Props {
  logout: () => void;
  routes: Route;
}

function PrivateLayout({
  children,
  logout,
  routes,
}: React.PropsWithChildren<Props>) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { pathname } = useLocation();
  const settings = {
    colorWeak: false,
    headerHeight: 60,
    title: '',
    fixedHeader: true,
    fixSiderbar: true,
    navTheme: 'light' as any,
  };

  return (
    <div className="private-layout h-screen">
      <ProLayout
        route={routes}
        logo={
          isCollapsed ? (
            <LogoShortSVG className="text-[black]" width={32} height={28} />
          ) : (
            <LogoSVG className="text-[black]" width={170} height={70} />
          )
        }
        location={{
          pathname,
        }}
        // menuHeaderRender={MenuHeader}
        // menuItemRender={MenuSidebarItem}
        rightContentRender={() => (
          <RightContentHeader
            logout={logout}
            isCollapsed={isCollapsed}
            setCollapse={setIsCollapsed}
          />
        )}
        collapsedButtonRender={false}
        collapsed={isCollapsed}
        onCollapse={setIsCollapsed}
        {...settings}
      >
        <Alert.ErrorBoundary>{children}</Alert.ErrorBoundary>
      </ProLayout>
    </div>
  );
}

export default PrivateLayout;
