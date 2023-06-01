import { userVar } from '#/graphql/cache';

import { USER_DEFAULT_IMAGE } from '#/shared/utils/constant';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useReactiveVar } from '@apollo/client';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

interface Props {
  logout: () => void;
  setCollapse: React.Dispatch<React.SetStateAction<boolean>>;
  isCollapsed: boolean;
}

function RightContentHeader({ logout, setCollapse, isCollapsed }: Props) {
  const navigate = useNavigate();

  const user = useReactiveVar(userVar);

  const redirectToInfoPage = () => {
    navigate('/employer/company');
  };

  const menu = (
    <Menu>
      <Menu.Item
        onClick={logout}
        key="logout"
        className="px-4 py-2 text-lg text-black"
      >
        {'Đăng xuất'}
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex w-full justify-between">
      <div className="items-center">
        <Button
          type="text"
          size="small"
          className="mt-5 border-none"
          onClick={() => setCollapse(!isCollapsed)}
        >
          {isCollapsed ? (
            <MenuUnfoldOutlined className="text-lg" />
          ) : (
            <MenuFoldOutlined className="text-lg" />
          )}
        </Button>
      </div>
      <div className="flex">
        <Dropdown overlay={menu}>
          <div className="flex items-center">
            <div className="mr-2 flex flex-col items-end leading-tight text-black">
              {`${user?.firstName} ${user?.lastName}` ?? ''}
            </div>
            <Avatar size="large" src={user?.avatar ?? USER_DEFAULT_IMAGE} />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}

export default RightContentHeader;
