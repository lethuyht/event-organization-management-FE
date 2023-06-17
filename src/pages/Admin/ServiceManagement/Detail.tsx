import { ServiceType, useGetServiceQuery } from '#/generated/schemas';
import { formatCurrency, showError } from '#/shared/utils/tools';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Col, Image, Row, Table, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ServiceProps, UpdateServiceStatus } from '.';
import { NO_IMAGE } from '#/shared/utils/constant';

export function ServiceDetail({ type }: ServiceProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, refetch } = useGetServiceQuery({
    variables: {
      id: String(id),
    },
    onError: error => showError(error),
  });

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => (
        <div dangerouslySetInnerHTML={{ __html: text || '' }} />
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => <div>{formatCurrency(price)}</div>,
    },
    {
      title: 'Số lượng',
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
    },
  ];

  return (
    <>
      <Row>
        <Typography.Title level={2} className="text-[#00081e]">
          {type === ServiceType.HumanResource
            ? 'CHI TIẾT DỊCH VỤ NHÂN SỰ EVENT'
            : 'CHI TIẾT DỊCH VỤ THIẾT BỊ EVENT'}
        </Typography.Title>
      </Row>

      <Row className="my-2 w-full rounded-lg bg-white p-4" gutter={[16, 16]}>
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
                src={data?.getService?.images?.[0] ?? NO_IMAGE}
                alt="avatar"
                className="mr-5 flex w-full justify-center rounded-2xl object-cover"
                height={220}
                width={220}
              />
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <strong className="text-lg text-black">Tên dịch vụ</strong>
                </Col>
                <Col span={16}>
                  <p className="text-lg text-black">{data?.getService?.name}</p>
                </Col>
                <Col span={8}>
                  <strong className="text-lg text-black">Mô tả</strong>
                </Col>
                <Col span={16}>
                  <p className="text-lg text-black">
                    {data?.getService.description}
                  </p>
                </Col>

                <Col span={8}>
                  <strong className="text-lg text-black">Trạng thái</strong>
                </Col>
                <Col span={16}>
                  <UpdateServiceStatus
                    serviceId={id as any}
                    onRefetch={refetch}
                    isPublished={data?.getService.isPublished ?? false}
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

      <Row className="my-4 w-full rounded-lg bg-white p-2" gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title level={3} className="text-[#00081e]">
            Nội dung chi tiết
          </Typography.Title>
        </Col>

        <Col span={24}>
          <div
            dangerouslySetInnerHTML={{ __html: data?.getService.detail || '' }}
            className="px-4 text-black"
          ></div>
        </Col>
      </Row>

      <Row className="my-4 w-full rounded-lg bg-white p-2" gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title level={3} className="text-[#00081e]">
            Các sản phẩm của dịch vụ
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={data?.getService?.serviceItems ?? []}
            loading={loading}
            rowKey="id"
            pagination={false}
          />
        </Col>
      </Row>
    </>
  );
}
