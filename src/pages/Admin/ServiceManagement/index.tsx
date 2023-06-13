import {
  FilterDto,
  useGetServiceQuery,
  useGetServicesQuery,
} from '#/generated/schemas';
import { useTable } from '#/shared/utils/tools';
import { Skeleton, Typography } from 'antd';
import { useState } from 'react';

export function ServiceManagement() {
  const { pageSize, currentPage, onChange, setCurrentPage } = useTable();
  const [filters, setFilters] = useState<FilterDto[]>([]);

  const {
    data: getServices,
    loading,
    refetch,
  } = useGetServicesQuery({
    variables: {
      query: {
        ...(filters.length ? { filters: [...filters] } : undefined),
        page: currentPage,
        limit: pageSize,
        orderBy: 'Service.updatedAt:DESC',
      },
    },
  });

  const columns = [
    {
      title: 'Tên dịch vụ',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'images',
      key: 'images',
      render: (images: string[]) => {
        return <img src={images[0]} alt="service" className="h-20 w-20" />;
      },
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: () => {},
    },
  ];

  return (
    <>
      <Typography.Title>QUẢN LÝ DỊCH VỤ</Typography.Title>
    </>
  );
}
