import {
  ServiceItem,
  ServiceType,
  useGetServiceQuery,
} from '#/generated/schemas';
import SliderComponent from '#/shared/components/common/SlideShow';
import { SLIDER_IMAGES } from '#/shared/utils/constant';
import { getToken } from '#/shared/utils/token';
import { formatCurrency, showError, useTable } from '#/shared/utils/tools';
import styled from '@emotion/styled';
import { Row, Table, Typography, Col, Image } from 'antd';
import { useParams } from 'react-router-dom';
import { AddToCartModal } from './AddToCartModal';

const DeviceDetailPageStyles = styled.div`
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
  .ant-table-thead {
    background-color: #ffff;
  }

  .ant-table-cell {
    font-weight: normal !important;
  }

  .ant-modal-confirm-content {
    color: black;
  }

  .ant-image {
    width: 100% !important;
  }
`;

interface Props {
  type: ServiceType;
}

export function ServiceDetailPage({ type }: Props) {
  const { id } = useParams();
  const isLogin = !!getToken();
  const {
    data: service,
    loading,
    error,
  } = useGetServiceQuery({
    variables: {
      id: id as any,
    },
    onError(error) {
      showError(error);
    },
  });
  const { pageSize, currentPage, onChange, setCurrentPage } = useTable();

  const columns = [
    {
      title: 'Tên thiết bị',
      dataIndex: 'name',
      key: 'name',
      render(name: string) {
        return (
          <Row className="flex min-w-[100px] items-center justify-between">
            <Typography.Text className="text-base text-black">
              {name}
            </Typography.Text>
          </Row>
        );
      },
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render(price?: string) {
        return (
          <Row className="flex min-w-[200px] items-center justify-between">
            <div dangerouslySetInnerHTML={{ __html: price || '' }} />
          </Row>
        );
      },
    },

    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      render(price: number) {
        return (
          <Row className="flex min-w-[50] items-center justify-between">
            <Typography.Text className="text-base text-black">
              {formatCurrency(price)}
            </Typography.Text>
          </Row>
        );
      },
    },
    {
      title: 'Số lượng sẵn có',
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
      render(quanlity: string) {
        return (
          <Row className="flex min-w-[50] items-center justify-between">
            <Typography.Text className="text-base text-black">
              {quanlity}
            </Typography.Text>
          </Row>
        );
      },
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (record: ServiceItem) => (
        <AddToCartModal serviceItem={record} onChange={() => {}} />
      ),
    },
  ];

  return (
    <DeviceDetailPageStyles className="content">
      <SliderComponent
        images={
          service?.getService?.images?.length
            ? service?.getService?.images
            : SLIDER_IMAGES[type]
        }
      />

      <Row className="mx-auto w-full max-w-container p-8">
        <Col span={24}>
          <Row className="w-full">
            <Col span={24}>
              <Typography.Title
                level={1}
                className="w-full text-center uppercase text-red-500"
              >
                {service?.getService.name}
              </Typography.Title>
            </Col>
            <Col span={24}>
              <Typography.Text className="block w-full text-center text-base text-black text-[#f97316]">
                {service?.getService.description}
              </Typography.Text>
            </Col>
          </Row>

          <Row className="mt-8 w-full">
            <div
              dangerouslySetInnerHTML={{
                __html: service?.getService?.detail || '',
              }}
            ></div>
          </Row>
        </Col>

        <Col span={24}>
          <Typography.Title level={3} className="mb-4">
            Danh sách các sản phẩm của chúng tôi
          </Typography.Title>
          <Table
            dataSource={service?.getService.serviceItems || []}
            columns={columns}
            scroll={{ x: 1400 }}
            pagination={false}
          />
        </Col>
      </Row>
    </DeviceDetailPageStyles>
  );
}
