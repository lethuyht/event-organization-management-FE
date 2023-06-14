import {
  FilterDto,
  IService,
  QueryOperator,
  ServiceType,
  useGetServicesQuery,
  useUpsertServiceMutation,
} from '#/generated/schemas';
import { FilterWrapper } from '#/shared/components/common';
import { showError, showSuccess, useTable } from '#/shared/utils/tools';
import { EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Skeleton,
  Switch,
  Table,
  Typography,
} from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface ServiceProps {
  type: ServiceType;
}

interface ManagementFilter {
  isPublished?: number;
  name?: string;
  description?: string;
}

interface UpdateProps {
  serviceId: string;
  isPublished: boolean;
  onRefetch: () => void;
}

const ServiceManagementStyle = styled.div`
  .anticon.anticon-eye,
  .anticon-edit {
    padding: 0 10px;
    svg {
      font-size: 25px;
      cursor: pointer;

      &:hover {
        color: #ff9a3c;
      }
    }
  }
`;

export function UpdateServiceStatus({
  serviceId,
  onRefetch,
  isPublished,
}: UpdateProps) {
  const { confirm } = Modal;
  const [updateService] = useUpsertServiceMutation({
    onCompleted: () => {
      showSuccess('Cập nhật trạng thái  thành công');
      onRefetch();
    },
    onError: error => {
      showError(error.message);
    },
  });

  const showConfirm = (checked: boolean) => {
    confirm({
      title: `Bạn có chắc chắn muốn ${
        checked ? 'công khai' : 'ẩn'
      } dịch vụ này không?`,
      onOk() {
        return updateService({
          variables: {
            input: {
              id: serviceId,
              isPublished: checked,
            },
          },
        });
      },
    });
  };

  return <Switch checked={isPublished} onChange={showConfirm} />;
}

export function ServiceManagement({ type }: ServiceProps) {
  const navigate = useNavigate();
  const { pageSize, currentPage, onChange, setCurrentPage } = useTable();
  const [filters, setFilters] = useState<FilterDto[]>([]);
  const {
    data: getServices,
    loading,
    refetch,
  } = useGetServicesQuery({
    fetchPolicy: 'network-only',
    variables: {
      query: {
        filters: [
          {
            field: 'Service.type',
            data: type,
            operator: QueryOperator.Eq,
          },
          ...filters,
        ],
        page: currentPage,
        limit: pageSize,
        orderBy: 'Service.updatedAt:DESC',
      },
    },
    onError: error => showError(error),
  });

  const columns = [
    {
      title: 'Tên dịch vụ',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'images',
      key: 'images',
      render: (images: string[]) => {
        return (
          images &&
          images.length > 0 && (
            <Row>
              {images.slice(2).map((image, index) => (
                <Image
                  src={image}
                  height={100}
                  width={150}
                  className="rounded"
                  key={index}
                />
              ))}
            </Row>
          )
        );
      },
    },
    {
      title: 'Trạng thái',
      key: 'isPublic',
      render: (service: IService) => {
        return (
          <UpdateServiceStatus
            serviceId={service.id}
            isPublished={service.isPublished}
            onRefetch={refetch}
          />
        );
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (service: IService) => {
        return (
          <Row>
            <EyeOutlined onClick={() => navigate(`${service.id}`)} />
            <EditOutlined onClick={() => navigate(`edit/${service.id}`)} />
          </Row>
        );
      },
    },
  ];

  const onFilter = ({ description, isPublished, name }: ManagementFilter) => {
    console.log({ description, isPublished, name });
    const newFilters: FilterDto[] = [];
    if (name && name.trim()) {
      newFilters.push({
        field: 'Service.name',
        data: name.trim(),
        operator: QueryOperator.Like,
      });
    }
    if (description && description.trim()) {
      newFilters.push({
        field: 'Service.description',
        data: description.trim(),
        operator: QueryOperator.Like,
      });
    }

    newFilters.push({
      field: 'Service.is_published',
      data:
        isPublished === -1 ? undefined : isPublished === 1 ? 'true' : 'false',
      operator: QueryOperator.Eq,
    });

    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <ServiceManagementStyle>
      <Typography.Title level={2}>
        {type === ServiceType.HumanResource
          ? 'QUẢN LÝ DỊCH VỤ NHÂN SỰ EVENT'
          : 'QUẢN LÝ DỊCH VỤ THIẾT BỊ EVENT'}
      </Typography.Title>

      <div className="manage-filter">
        <FilterWrapper<ManagementFilter>
          onFilter={onFilter}
          extraButton={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate(`/admin/service-management/human/create`)}
            >
              Thêm mới
            </Button>
          }
          className="mb-3 flex justify-end rounded-md border  bg-[white] p-2"
        >
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6} className="my-2">
            <Form.Item name="name" className="mb-0">
              <Input placeholder={'Tìm kiếm theo tên'} className="text-black" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6} className="my-2">
            <Form.Item name="description" className="mb-0">
              <Input
                placeholder={'Tìm kiếm theo mô tả'}
                className="text-black"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6} className="my-2">
            <Form.Item name="isPublished" className="mb-0">
              <Select defaultValue={-1}>
                <Select.Option value={-1}>Tất cả</Select.Option>
                <Select.Option value={1}>Công khai</Select.Option>
                <Select.Option value={0}>Chưa công khai</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </FilterWrapper>
      </div>
      <Skeleton loading={loading}>
        <Table
          dataSource={getServices?.getServices.items ?? []}
          columns={columns as any}
          loading={loading}
          scroll={{ x: 1400 }}
          pagination={{
            total: getServices?.getServices.meta.totalItems ?? 0,
            current: currentPage,
            showTotal: (total, range) => {
              return (
                <div className="border-gray mr-2 flex items-center rounded-3xl border bg-[white] px-3 text-[#f97316]">{`${range?.[0]}-${range?.[1]}/ ${total}`}</div>
              );
            },
          }}
          onChange={onChange}
        />
      </Skeleton>
    </ServiceManagementStyle>
  );
}
