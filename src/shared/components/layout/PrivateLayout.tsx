import { Route } from '@ant-design/pro-layout/lib/typings';
import { Alert, Image } from 'antd';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuSidebarItem } from '../common/MenuHeader';
import RightContentHeader from './RightContentHeader';
import ProLayout from '@ant-design/pro-layout';
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
  const navigate = useNavigate();

  const settings = {
    headerHeight: 60,
    title: '',
    fixedHeader: true,
    fixSiderbar: true,
    siderWidth: 280,
    navTheme: 'light' as any,
  };

  return (
    <div className="private-layout h-screen">
      <ProLayout
        route={routes}
        logo={
          isCollapsed ? (
            <div className="w-[40px]"></div>
          ) : (
            <Image
              src="https://polaris-event.s3.ap-southeast-1.amazonaws.com/static/logo.png"
              height={100}
              width={240}
              preview={false}
              onClick={() => navigate('/')}
            />
          )
        }
        location={{
          pathname,
        }}
        menuItemRender={(path, dom) => (
          <MenuSidebarItem path={path.path} dom={dom} />
        )}
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
