import { useGetEventQuery } from '#/generated/schemas';
import { showError } from '#/shared/utils/tools';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Button, Col, Image, Row, Space, Switch, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { UpdateEventStatus } from '.';

const EventDetailStyle = styled.div``;

export function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, refetch } = useGetEventQuery({
    variables: {
      input: String(id),
    },
    onError: error => showError(error),
  });

  return (
    <EventDetailStyle>
      <Row>
        <Typography.Title level={2} className="text-[#00081e]">
          CHI TIẾT SỰ KIỆN
        </Typography.Title>
      </Row>

      <Row className="my-4 w-full rounded-lg bg-white p-4" gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title level={3} className="text-[#00081e]">
            Tổng quan
          </Typography.Title>
        </Col>
        <Col sm={24} md={24} lg={20} xl={20} xxl={20}>
          <Row gutter={[16, 16]}>
            <Col
              xs={24}
              sm={12}
              md={12}
              lg={8}
              xl={8}
              xxl={8}
              className="flex w-full justify-start"
            >
              <Image
                src={data?.getEvent.thumbnail ?? ''}
                alt="avatar"
                className="mr-5 flex w-full justify-center rounded-2xl object-cover"
                height={220}
              />
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <strong className="text-lg text-black">Tên sự kiện</strong>
                </Col>
                <Col span={16}>
                  <p className="text-lg text-black">{data?.getEvent.name}</p>
                </Col>
                <Col span={8}>
                  <strong className="text-lg text-black">Mô tả</strong>
                </Col>
                <Col span={16}>
                  <p className="text-lg text-black">
                    {data?.getEvent.description}
                  </p>
                </Col>

                <Col span={8}>
                  <strong className="text-lg text-black">Trạng thái</strong>
                </Col>
                <Col span={16}>
                  <UpdateEventStatus
                    eventId={id as any}
                    onRefetch={refetch}
                    isPublic={data?.getEvent.isPublic ?? false}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col sm={24} md={24} lg={4} xl={4} xxl={4} className="flex justify-end">
          <Row gutter={[8, 8]} className="h-fit">
            <Col span={24} className="text-right">
              <Button
                type="primary"
                htmlType="submit"
                icon={<EditOutlined />}
                onClick={() => {
                  navigate(`/admin/event-management/edit/${id}`);
                }}
              >
                Cập nhật
              </Button>
            </Col>
            <Col span={24} className="text-right">
              <Button
                block
                icon={<DeleteOutlined />}
                onClick={() => {}}
                className=" w-32 font-bold text-red-500"
              >
                Xóa
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="w-full rounded-lg bg-white p-4 " gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title level={3} className="text-[#00081e]">
            Nội dung chi tiết
          </Typography.Title>
        </Col>

        <Col span={24}>
          <div
            dangerouslySetInnerHTML={{ __html: data?.getEvent.detail || '' }}
            className="px-4"
          ></div>
        </Col>
      </Row>
    </EventDetailStyle>
  );
}
