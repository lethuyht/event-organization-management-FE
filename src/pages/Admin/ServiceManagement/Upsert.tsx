import {
  useGetServiceQuery,
  useUpsertServiceMutation,
} from '#/generated/schemas';
import DynamicField from '#/shared/components/common/DynamicField';
import { TextEditor } from '#/shared/components/common/TextEditor';
import UploadImage from '#/shared/components/common/UploadImage';
import { showError, showSuccess } from '#/shared/utils/tools';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Skeleton,
  Switch,
  Typography,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useParams } from 'react-router-dom';
import { ServiceProps } from '.';
import { DynamicServiceItem } from './DynamicServiceItem';
import _ from 'lodash';

const UpserEventStyles = styled.div`
  .ant-form-item-label {
    label[title] {
      color: #000 !important;
    }
  }

  .ant-input {
    border: solid 1px #ccc !important;
    border-radius: 0.5rem !important;

    &[value] {
      color: #000 !important;
      font-size: 16px !important;
    }
  }

  .ant-row {
    display: block !important;
  }

  textarea {
    font-size: 16px !important;
  }

  .form-header.ant-row {
    justify-content: end !important;
    .ant-row {
      display: flex !important;
    }
    display: flex !important;
  }
`;
export function UpsertService({ type }: ServiceProps) {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();

  const [upsertService, { loading: upsertLoading }] = useUpsertServiceMutation({
    onCompleted: () => {
      showSuccess(
        id ? 'Cập nhật dịch thành công' : 'Thêm mới dịch vụ thành công',
      );
    },
    onError: error => showError(error),
  });

  const { data, loading } = useGetServiceQuery({
    variables: {
      id: String(id),
    },
    onCompleted: data => {
      if (data && data.getService.description) {
        form.setFieldsValue({ detail: data?.getService?.detail });
      }
    },
  });

  const hanleUpsertService = (values: any) => {
    upsertService({
      variables: {
        input: {
          id: data?.getService?.id,
          ...values,
          type,
        },
      },
    });
  };

  const handleEditorChange = (text: string) => {
    form.setFieldsValue({ detail: text });
  };
  return (
    <Skeleton loading={loading}>
      <UpserEventStyles className="rounded-lg bg-white p-4 ">
        <Row className="mb-4">
          <Col span={24}>
            <Typography.Title level={3}>
              {data ? 'Cập nhật dịch vụ' : 'Thêm mới dịch vụ'}
            </Typography.Title>
          </Col>
        </Row>
        <Form form={form} onFinish={hanleUpsertService}>
          <Row gutter={[16, 16]} className="form-header">
            <Form.Item
              name="isPublished"
              label="Công khai"
              required
              valuePropName="checked"
              initialValue={data?.getService?.isPublished}
            >
              {data ? <Switch /> : <Switch />}
            </Form.Item>

            <Form.Item className="mx-4">
              <Button
                type="primary"
                htmlType="submit"
                loading={upsertLoading}
                icon={id ? <EditOutlined /> : <PlusOutlined />}
              >
                {data ? 'Cập nhật ' : 'Thêm mới'}
              </Button>
            </Form.Item>
          </Row>

          <Form.Item
            label="Hình ảnh"
            name="images"
            rules={[
              {
                required: true,
                validator: async (_, value) => {
                  if (
                    !value ||
                    value.length === 0 ||
                    value.some((v: { src: any }) => !v || v.src)
                  ) {
                    return Promise.reject(new Error('Vui lòng nhập hình ảnh'));
                  }
                },
              },
            ]}
          >
            <DynamicField
              name="images"
              childrenItem={<UploadImage />}
              initialValues={data?.getService.images ?? ['']}
              valuePropName="src"
            />
          </Form.Item>

          <Form.Item
            label="Tên dịch vụ"
            required
            name="name"
            initialValue={data?.getService?.name}
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên dịch vụ',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            required
            name="description"
            initialValue={data?.getService?.description}
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mô tả',
              },
            ]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            label="Nội dung chi tiết"
            required
            name="detail"
            rules={[
              {
                required: true,
                validator: async (_, value) => {
                  if (!value || value == '' || value.trim() == '<p></p>') {
                    return Promise.reject(
                      new Error('Vui lòng nhập nội dung chi tiết'),
                    );
                  }
                },
              },
            ]}
          >
            <TextEditor
              onChange={handleEditorChange}
              initialValue={data?.getService?.detail || ''}
            />
          </Form.Item>

          <Form.Item
            label="Các sản phẩm"
            name="serviceItems"
            rules={[
              {
                required: true,
                validator: async (_, value) => {
                  if (!value || value.length === 0) {
                    return Promise.reject(new Error('Vui lòng nhập sản phẩm'));
                  }
                },
              },
            ]}
          >
            <DynamicServiceItem
              initialValues={
                data?.getService?.serviceItems?.map(item =>
                  _.pick(item, [
                    'id',
                    'name',
                    'description',
                    'isPublished',
                    'price',
                    'totalQuantity',
                  ]),
                ) ?? []
              }
              form={form}
            />
          </Form.Item>
        </Form>
      </UpserEventStyles>
    </Skeleton>
  );
}
