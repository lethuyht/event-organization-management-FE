import { FilterWrapper } from '#/shared/components/common';
import { Row, Skeleton, Typography } from 'antd';

interface HumanManagementFilter {
  name?: string;
  status?: string;
}
export function Human() {
  return (
    <>
      <Typography.Title>Quản lý Loại hình nhân sự</Typography.Title>
    </>
  );
}
