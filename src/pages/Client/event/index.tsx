import { QueryOperator, useGetEventsQuery } from '#/generated/schemas';
import Pagination from '#/shared/components/Styled/Pagination';
import usePagination from '#/shared/hooks/usePagination';
import { EVENT_DEFAULT } from '#/shared/utils/constant';
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

const EventPageStyles = styled.div`
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

export function EventPage() {
  const [search, setSearch] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const { currentPage, pageSize, setCurrentPage } = usePagination({
    defaultPageSize: 12,
  });
  const { data: events, loading } = useGetEventsQuery({
    variables: {
      queryParams: {
        filters: [
          {
            field: 'Event.name',
            data: search,
            operator: QueryOperator.Like,
          },
          {
            field: 'Event.is_public',
            data: 'true',
            operator: QueryOperator.Eq,
          },
        ],
        limit: pageSize,
        page: currentPage,
        orderBy: 'Event.createdAt:DESC',
      },
    },
    onError(error) {
      showError(error);
    },
  });

  return (
    <EventPageStyles className="content ">
      <div
        className={`thumbnail  bg-[url('../../assets/images/event_default.jpg')]`}
      >
        <Input
          value={inputValue}
          className="w-1/2 text-center "
          prefix={<SearchOutlined />}
          placeholder="Nhập tên sự kiện cần tìm....."
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
      <Row className="mx-auto min-h-[1000px]  w-full max-w-container py-8 ">
        <Typography.Title level={1} className="w-full text-center text-red-500">
          Sự kiện
        </Typography.Title>
        <Col span={24} className="py-8">
          <Skeleton loading={loading}>
            <Row gutter={[16, 16]}>
              {events?.getEvents?.items?.length ? (
                events?.getEvents?.items?.map(event => (
                  <Col
                    xs={24}
                    sm={12}
                    md={8}
                    lg={6}
                    xl={6}
                    xxl={6}
                    key={event.id}
                  >
                    <Card
                      onClick={() => {
                        window.location.href = `/event/${event.id}`;
                      }}
                      hoverable
                      cover={
                        <Image
                          height={300}
                          preview={false}
                          src={`${event?.thumbnail ?? EVENT_DEFAULT}`}
                        />
                      }
                    >
                      <Meta
                        className="w-full text-center"
                        title={event.name}
                        description={
                          <p className={'min-h-[120px] overflow-hidden'}>
                            <p className={'description'}>{event.description}</p>
                            <p className="day">
                              {dayjs(event.updatedAt).format('YYYY-MM-DD')}
                            </p>
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
          {events?.getEvents?.items.length ? (
            <div className="mt-6 flex justify-center">
              <Pagination
                current={currentPage}
                defaultPageSize={pageSize}
                onChange={page => {
                  scrollToTop();
                  setCurrentPage(page);
                }}
                defaultCurrent={1}
                total={events?.getEvents?.meta.totalItems}
              />
            </div>
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </EventPageStyles>
  );
}
