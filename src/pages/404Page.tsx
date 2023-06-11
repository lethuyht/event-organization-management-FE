import { Button, Result, Typography } from 'antd';
import { Link } from 'react-router-dom';

import { useReactiveVar } from '@apollo/client';
import { userVar } from '#/graphql/cache';
import { ROLE } from '#/shared/utils/type';
import { useEffect, useState } from 'react';

function NotFoundPage() {
  const [homeLink, setHomeLink] = useState('');

  const userProfile = useReactiveVar(userVar);
  useEffect(() => {
    if (userProfile.role?.name === ROLE.EMPLOYER) {
      setHomeLink('employer/company');
    } else if (userProfile.role?.name === ROLE.ADMIN) {
      setHomeLink('admin');
    }
  }, []);

  return (
    <Result
      status="404"
      title={<Typography.Title level={1}>404</Typography.Title>}
      subTitle="Rất tiếc, trang bạn đang truy cập không tồn tại."
      extra={
        <Link to={`/${homeLink}`}>
          <Button type="primary">Quay về trang chủ</Button>
        </Link>
      }
    />
  );
}

export default NotFoundPage;
