import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface MenuHeaderProps {
  logo: ReactNode;
  title: ReactNode;
}

export const MenuHeader: React.FC<MenuHeaderProps> = ({ logo, title }) => {
  return (
    <Link to="/">
      {logo}
      {title}
    </Link>
  );
};

interface MenuSidebarItemProps {
  path?: string;
  dom: ReactNode;
}

export const MenuSidebarItem: React.FC<MenuSidebarItemProps> = ({
  path,
  dom,
}) => {
  return <Link to={path !== undefined ? path : '/'}>{dom}</Link>;
};
