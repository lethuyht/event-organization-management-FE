import {
  QueryOperator,
  ServiceType,
  useGetServicesQuery,
} from '#/generated/schemas';
import Pagination from '#/shared/components/Styled/Pagination';
import usePagination from '#/shared/hooks/usePagination';
import { DEVICE_ITEM_DEFAULT } from '#/shared/utils/constant';
import { scrollToTop, showError } from '#/shared/utils/tools';
import { SearchOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import {
  Card,
  Col,
  Empty,
  Image,
  Input,
  Row,
  Skeleton,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

const { Meta } = Card;

const DevicePageStyles = styled.div`
  .ant-input-affix-wrapper {
    background-color: white !important;
    padding: 10px 20px !important;
    border-radius: 50px !important;

    input[value] {
      color: black !important;
    }

    .anticon {
      margin-right: 10px !important;

      svg {
        color: black !important;
        font-size: 20px !important;
      }
    }
  }

  .ant-card-meta-detail {
    width: 100%;

    .ant-card-meta-title {
      font-size: 16px;
      font-weight: bold;
    }

    .ant-card-meta-description .day {
      color: orange;
    }
  }

  .description {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
`;

export interface Props {
  type: ServiceType;
}

export function Service({ type }: Props) {
  const [search, setSearch] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const { currentPage, pageSize, setCurrentPage } = usePagination({
    defaultPageSize: 12,
  });

  const { data: devices, loading } = useGetServicesQuery({
    variables: {
      query: {
        filters: [
          {
            field: 'Service.type',
            data: type,
            operator: QueryOperator.Eq,
          },
          {
            field: 'Service.name',
            data: search,
            operator: QueryOperator.Like,
          },
          {
            field: 'Service.is_published',
            data: 'true',
            operator: QueryOperator.Eq,
          },
        ],
        limit: pageSize,
        page: currentPage,
        orderBy: 'Service.createdAt:DESC',
      },
    },
    onError(error) {
      showError(error);
    },
  });

  return (
    <DevicePageStyles className="content ">
      <div
        className={`thumbnail  bg-[url('../../assets/images/device_service_default.jpeg')]`}
      >
        <Input
          value={inputValue}
          className="w-1/2 text-center "
          prefix={<SearchOutlined />}
          placeholder="Nhập tên dịch vụ cần tìm....."
          onChange={(value: any) => {
            setInputValue(value.target.value);
          }}
          onPressEnter={() => {
            setSearch(inputValue);
            setInputValue('');
            scrollTo({ top: 950, behavior: 'smooth' });
          }}
        />
      </div>
      <Row className="mx-auto min-h-[1000px]  w-full max-w-container p-8 ">
        <Typography.Title level={1} className="w-full text-center text-red-500">
          {type === ServiceType.Device ? 'Thiết bị sự kiện' : 'Nhân sự sự kiện'}
        </Typography.Title>
        <Col span={24} className="py-8">
          <Skeleton loading={loading}>
            <Row gutter={[16, 16]}>
              {devices?.getServices?.items?.length ? (
                devices?.getServices?.items?.map(device => (
                  <Col
                    xs={24}
                    sm={24}
                    md={12}
                    lg={8}
                    xl={6}
                    xxl={6}
                    key={device.id}
                  >
                    <Card
                      onClick={() => {
                        window.location.href = `/${
                          type === ServiceType.Device ? 'device' : 'human-event'
                        }/${device.id}`;
                      }}
                      hoverable
                      cover={
                        <Image
                          height={300}
                          preview={false}
                          src={`${
                            device?.images?.length
                              ? device.images[0]
                              : DEVICE_ITEM_DEFAULT
                          }`}
                        />
                      }
                    >
                      <Meta
                        className="w-full text-center"
                        title={device.name}
                        description={
                          <p className={'min-h-[120px] overflow-hidden'}>
                            <p className="description">{device.description}</p>
                            <span className="day my-2 block">
                              {dayjs(device.createdAt).format('YYYY-MM-DD')}
                            </span>
                          </p>
                        }
                      />
                    </Card>
                  </Col>
                ))
              ) : (
                <Col className="flex w-full items-center justify-center">
                  <Empty />
                </Col>
              )}
            </Row>
          </Skeleton>
        </Col>
        <Col span={24}>
          {devices?.getServices?.items.length ? (
            <div className="mt-6 flex justify-center">
              <Pagination
                current={currentPage}
                defaultPageSize={pageSize}
                onChange={page => {
                  scrollToTop();
                  setCurrentPage(page);
                }}
                defaultCurrent={1}
                total={devices?.getServices?.meta.totalItems}
              />
            </div>
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </DevicePageStyles>
  );
}
