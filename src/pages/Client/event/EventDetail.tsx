import { useGetEventQuery } from '#/generated/schemas';
import { EVENT_DEFAULT } from '#/shared/utils/constant';
import styled from '@emotion/styled';
import { Alert, Col, Image, Row, Table, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { formatCurrency } from '#/shared/utils/tools';
import { CreateEventContract } from '#/pages/Client/event/CreateEventContract';
import { userVar } from '#/graphql/cache';
import { ROLE } from '#/shared/utils/type';

const EventDetailPageStyles = styled.div`
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
`;

export function EventDetailPage() {
  const { id } = useParams();
  const { data: event, loading } = useGetEventQuery({
    variables: {
      input: id as any,
    },
  });
  const user = userVar();

  const columns = [
    {
      title: 'Tên dịch vụ',
      dataIndex: ['serviceItem', 'name'],
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: ['serviceItem', 'description'],
      key: 'description',
      render: (text: string) => (
        <div dangerouslySetInnerHTML={{ __html: text || '' }} />
      ),
    },
    {
      title: 'Giá',
      dataIndex: ['serviceItem', 'price'],
      key: 'price',
      render: (price: number) => <div>{formatCurrency(price)}</div>,
    },
    {
      title: 'Số lượng',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];

  return (
    <EventDetailPageStyles className="content ">
      <Row className="mx-auto min-h-[1000px]  w-full max-w-container py-8 ">
        <Typography.Title level={1} className="w-full text-center text-red-500">
          {event?.getEvent.name}
        </Typography.Title>
        <text className="pb-8 text-xl text-black">
          Polaris Event – với hơn 10 năm xây dựng và phát triển với những thành
          tựu nhất định trong việc tổ chức nhiều sự kiện thành công cho các cơ
          quan, đơn vị và doanh nghiệp trên toàn quốc. Polaris Event luôn tự tin
          là một trong những công ty tổ chức sự kiện hàng đầu tại Việt Nam. Đơn
          vị chuyên hỗ trợ, tư vấn, cung cấp dịch vụ {event?.getEvent.name} trọn
          gói từ Bắc – Nam với mức giá cạnh tranh, hợp lý nhất.
        </text>
        <Image
          src={`${event?.getEvent.thumbnail ?? EVENT_DEFAULT}`}
          preview={false}
        />
        <div
          dangerouslySetInnerHTML={{ __html: event?.getEvent.detail || '' }}
          className="py-8 text-black"
        />
        {Number(event?.getEvent?.eventServiceItems?.length) > 0 && (
          <Row
            className="my-4 w-full rounded-lg bg-white p-2"
            gutter={[16, 16]}
          >
            <Col span={24}>
              <Typography.Title level={3} className="text-[#00081e]">
                Các dịch vụ kèm theo
              </Typography.Title>
            </Col>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={event?.getEvent?.eventServiceItems ?? []}
                loading={loading}
                rowKey="id"
                pagination={false}
              />
            </Col>
            {event?.getEvent?.eventServiceItems?.length &&
              localStorage.getItem("role") === ROLE.USER && (
                <Col span={24} className={'mt-4'}>
                  <Alert
                    className={'rounded-md py-4 shadow-lg'}
                    message={
                      <Row className={'flex items-center justify-between'}>
                        <Typography.Text className={'text-lg text-black'}>
                          Bạn có nhu cầu tổ chức sự kiện này. Nhấn vào nút bên
                          cạnh để đăng kí ngay nhé!
                        </Typography.Text>
                        <Col span={6}>
                          <CreateEventContract event={event?.getEvent as any} />
                        </Col>
                      </Row>
                    }
                    type="info"
                    showIcon
                  />
                </Col>
              )}
          </Row>
        )}
      </Row>
    </EventDetailPageStyles>
  );
}
