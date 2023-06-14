import {
  FilterDto,
  IEvent,
  QueryOperator,
  useGetEventsQuery,
  useUpsertEventMutation,
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

interface EventManagementFilter {
  isPublic?: number;
  name?: string;
  description?: string;
}

interface UpdateEventProps {
  eventId: string;
  isPublic: boolean;
  onRefetch: () => void;
}

const EventManagementStyle = styled.div`
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

export function UpdateEventStatus({
  eventId,
  onRefetch,
  isPublic,
}: UpdateEventProps) {
  const { confirm } = Modal;
  const [updateEvent] = useUpsertEventMutation({
    onCompleted: () => {
      showSuccess('Cập nhật trạng thái sự kiện thành công');
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
      } sự kiện này không?`,
      onOk() {
        return updateEvent({
          variables: {
            input: {
              id: eventId,
              isPublic: checked,
            },
          },
        });
      },
    });
  };

  return <Switch checked={isPublic} onChange={showConfirm} />;
}

export function EventManagement() {
  const navigate = useNavigate();
  const { pageSize, currentPage, onChange, setCurrentPage } = useTable();
  const [filters, setFilters] = useState<FilterDto[]>([]);
  const {
    data: getEvents,
    loading,
    refetch,
  } = useGetEventsQuery({
    fetchPolicy: 'network-only',
    variables: {
      queryParams: {
        ...(filters.length ? { filters: [...filters] } : undefined),
        page: currentPage,
        limit: pageSize,
        orderBy: 'Event.updatedAt:DESC',
      },
    },
    onError: error => showError(error),
  });

  const columns = [
    {
      title: 'Tên sự kiện',
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
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumbnail: string) => {
        return (
          <Image src={thumbnail} height={100} width={150} className="rounded" />
        );
      },
    },
    {
      title: 'Trạng thái',
      key: 'isPublic',
      render: (event: IEvent) => {
        return (
          <UpdateEventStatus
            eventId={event.id}
            isPublic={event.isPublic}
            onRefetch={refetch}
          />
        );
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (event: IEvent) => {
        return (
          <Row>
            <EyeOutlined onClick={() => navigate(`${event.id}`)} />
            <EditOutlined onClick={() => navigate(`edit/${event.id}`)} />
          </Row>
        );
      },
    },
  ];

  const onFilter = ({ description, isPublic, name }: EventManagementFilter) => {
    const newFilters: FilterDto[] = [];
    if (name && name.trim()) {
      newFilters.push({
        field: 'Event.name',
        data: name.trim(),
        operator: QueryOperator.Like,
      });
    }
    if (description && description.trim()) {
      newFilters.push({
        field: 'Event.description',
        data: description.trim(),
        operator: QueryOperator.Like,
      });
    }

    newFilters.push({
      field: 'Event.is_public',
      data: isPublic === -1 ? undefined : isPublic === 1 ? 'true' : 'false',
      operator: QueryOperator.Eq,
    });

    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <EventManagementStyle>
      <Typography.Title level={2}>QUẢN LÝ SỰ KIỆN</Typography.Title>

      <div className="manage-filter">
        <FilterWrapper<EventManagementFilter>
          onFilter={onFilter}
          extraButton={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate(`/admin/event-management/create`)}
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
            <Form.Item name="isPublic" className="mb-0">
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
          dataSource={getEvents?.getEvents.items ?? []}
          columns={columns as any}
          loading={loading}
          scroll={{ x: 1400 }}
          pagination={{
            total: getEvents?.getEvents.meta.totalItems ?? 0,
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
    </EventManagementStyle>
  );
}
