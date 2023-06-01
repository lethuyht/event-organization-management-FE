import { Col, Dropdown, Menu, Typography } from 'antd';

import { Link, useLocation } from 'react-router-dom';
import { SubMenuItem } from '#/shared/utils/type';

interface NavLinkProps {
  href?: string;
  title?: string;
  extraIcon?: JSX.Element;
  subMenu?: SubMenuItem[];
  activeHrefs?: string[];
}

function NavLink({
  href,
  title,
  extraIcon,
  subMenu,
  activeHrefs,
}: NavLinkProps) {
  const { pathname } = useLocation();
  const isActive = activeHrefs?.includes(pathname?.split('/')?.[1]);

  const renderLink = (href: string) => (
    <Link to={href}>
      <Typography className="font-medium">
        {title ?? 'Thông tin cá nhân'}
      </Typography>
    </Link>
  );

  return subMenu?.[0] ? (
    <Dropdown
      overlay={
        <Menu
          items={subMenu.map(menu => ({
            key: menu.key,
            label: menu?.render ? (
              menu?.render()
            ) : (
              <div className="flex items-center gap-2">
                {menu?.href ? (
                  <Link to={menu?.href}>
                    <>
                      {menu.icon}
                      {menu.title ?? 'Xem thêm'}
                    </>
                  </Link>
                ) : (
                  <Typography>{menu.title ?? 'Xem thêm'}</Typography>
                )}
              </div>
            ),
          }))}
        />
      }
    >
      <Col
        className={`flex h-full items-center justify-center ${
          isActive ? 'bg-slate-100' : ''
        }  hover:bg-slate-100`}
      >
        {href ? (
          renderLink(href)
        ) : (
          <Typography className="font-medium">
            {title ?? 'Thông tin cá nhân'}
          </Typography>
        )}
        {extraIcon}
      </Col>
    </Dropdown>
  ) : (
    <Col className="flex h-full items-center justify-center">
      {href ? (
        <Link to={href}>
          <Typography
            className={`text-2xl font-bold  ${
              isActive ? 'text-red-500' : 'text-white'
            }`}
          >
            {title ?? 'Thông tin cá nhân'}
          </Typography>
        </Link>
      ) : (
        <Typography className="font-medium">
          {title ?? 'Thông tin cá nhân'}
        </Typography>
      )}
      {extraIcon}
    </Col>
  );
}

export default NavLink;
