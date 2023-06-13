import { MenuItem } from '#/shared/utils/type';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { Col, Image, Row, Typography } from 'antd';
import { Dispatch, SetStateAction, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PrimaryButton from '../../buttons/PrimaryButton';
import AccountInfo from './AccountInfo';
import NavLink from './NavLink';

interface OverLayProps {
  setVisible: Dispatch<SetStateAction<boolean>>;
  routes?: Route[];
  className?: string;
}

type Route = {
  href?: string;
  title: string;
  extraIcon?: JSX.Element;
  isInternal?: boolean;
};

function OverLay({ setVisible, routes, className }: OverLayProps) {
  const renderHref = (href: string, title: string) => (
    <Link to={href}>
      <Typography className="cursor-pointer text-xl text-white hover:text-orange-500">
        {title}
      </Typography>
    </Link>
  );

  return (
    <div
      className={`${className} fixed z-50 flex h-screen w-screen flex-col items-center bg-black bg-opacity-80 px-8 py-10`}
    >
      <div className="mb-4 w-full text-xl text-white">
        <CloseOutlined
          className="float-right"
          onClick={() => setVisible(false)}
        />
      </div>
      <div className="flex h-full flex-col items-center justify-center gap-4">
        {routes?.map(route => (
          <div key={route.title}>
            {route?.href && renderHref(route.href, route.title)}
          </div>
        ))}
      </div>
    </div>
  );
}

const routes: MenuItem[] = [
  {
    href: '/',
    title: 'Trang chủ',
    activeHrefs: [''],
  },
  {
    href: '/event',
    title: 'Dịch vụ sự kiện',
    activeHrefs: ['event'],
  },
  {
    href: `/device`,
    title: 'Thiết bị sự kiện',
    activeHrefs: ['device'],
  },
  {
    href: `/human-event`,
    title: 'Nhân sự event',
    activeHrefs: ['human-event'],
  },
];

interface HeaderProps {
  authenticated?: boolean;
}

function Header({ authenticated }: HeaderProps) {
  const navigate = useNavigate();
  const [overlayVisible, setOverlayVisible] = useState(false);

  return (
    <>
      {overlayVisible && (
        <OverLay
          setVisible={setOverlayVisible}
          routes={routes}
          className="hidden xlg:flex"
        />
      )}

      <Row
        className="backdrop-filter-header flex items-center justify-between bg-[#00081e] py-[30px]"
        justify="space-between"
        align="middle"
        gutter={[16, 32]}
      >
        <Col className="px-[40px]">
          <Link to="/">
            <Image
              src="https://polaris-event.s3.ap-southeast-1.amazonaws.com/static/logo.png"
              preview={false}
              width={150}
            />
          </Link>
        </Col>
        <>
          <Col className="hidden items-center justify-end gap-4  xlg:flex">
            {authenticated ? (
              <AccountInfo />
            ) : (
              <PrimaryButton
                className="h-full py-2 px-4 text-xl"
                onClick={() => navigate('/sign-in')}
              >
                Đăng nhập
              </PrimaryButton>
            )}
            <MenuOutlined onClick={() => setOverlayVisible(true)} />
          </Col>
        </>
        <>
          <Col className="h-full cursor-pointer xlg:hidden">
            <div className=" flex h-full items-center justify-center gap-8">
              {routes?.map(route => (
                <NavLink
                  title={route.title}
                  href={route.href}
                  key={route.title}
                  extraIcon={route.extraIcon}
                  subMenu={route.subMenu}
                  activeHrefs={route.activeHrefs}
                />
              ))}
            </div>
          </Col>
          <Col className="min-w-[10rem] xlg:hidden">
            {authenticated ? (
              <AccountInfo />
            ) : (
              <PrimaryButton
                className="h-full py-2 px-4 text-xl"
                onClick={() => navigate('/sign-in')}
              >
                Đăng nhập
              </PrimaryButton>
            )}
          </Col>
        </>
      </Row>
    </>
  );
}

export default Header;
