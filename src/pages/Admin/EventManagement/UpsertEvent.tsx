import { useGetEventQuery, useUpsertEventMutation } from '#/generated/schemas';
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
import { DynamicEventServiceItem } from '#/pages/Admin/EventManagement/DynamicEventServiceItem';
import { useEffect } from 'react';

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

export function UpsertEvent() {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();

  const [upsertEvent, { loading: upsertLoading }] = useUpsertEventMutation({
    onCompleted: () => {
      showSuccess(
        id ? 'Cập nhật sự kiện thành công' : 'Thêm mới sự kiện thành công',
      );
    },
    onError: error => showError(error),
  });

  const { data, loading } = useGetEventQuery({
    variables: {
      input: String(id),
    },
  });

  const hanleUpsertEvent = (values: any) => {
    upsertEvent({
      variables: {
        input: {
          ...values,
          detail: values.detail || data?.getEvent?.detail,
          isPublic: values.isPublic || false,
          id: data ? data.getEvent?.id : undefined,
          eventServiceItems: values.eventServiceItems.map((item: any) => {
            return {
              id: item.id,
              serviceItemId: item.serviceItemId,
              amount: Number(item.amount),
              serviceId: undefined,
              serviceType: undefined,
            };
          }),
        },
      },
    });
  };

  const handleEditorChange = (text: string) => {
    form.setFieldsValue({ detail: text });
  };

  useEffect(() => {
    if (data?.getEvent?.detail) {
      form.setFieldsValue({ detail: data?.getEvent?.detail });
    }
  }, [data]);
  return (
    <Skeleton loading={loading}>
      <UpserEventStyles className="rounded-lg bg-white p-4 ">
        <Row className="mb-4">
          <Col span={24}>
            <Typography.Title level={3}>
              {data ? 'Cập nhật sự kiện' : 'Thêm mới sự kiện'}
            </Typography.Title>
          </Col>
        </Row>
        <Form form={form} onFinish={hanleUpsertEvent}>
          <Row gutter={[16, 16]} className="form-header">
            <Form.Item
              name="isPublic"
              label="Công khai"
              required
              valuePropName="checked"
              initialValue={data?.getEvent?.isPublic ?? false}
            >
              <Switch />
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
            name="thumbnail"
            required
            initialValue={data?.getEvent?.thumbnail}
            valuePropName="src"
            rules={[
              {
                required: true,
                validator: async (_, value) => {
                  if (!value || value.src === '') {
                    return Promise.reject(new Error('Vui lòng chọn hình ảnh'));
                  }
                },
              },
            ]}
          >
            <UploadImage />
          </Form.Item>
          <Form.Item
            label="Tên sự kiện"
            required
            name="name"
            initialValue={data?.getEvent?.name}
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên sự kiện',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            required
            name="description"
            initialValue={data?.getEvent?.description}
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
              initialValue={data?.getEvent?.detail}
            />
          </Form.Item>
          <Form.Item
            label={'Các dịch vụ kèm theo của sự kiện'}
            name={'eventServiceItems'}
            required
          >
            <DynamicEventServiceItem
              initialValues={data?.getEvent?.eventServiceItems || []}
              form={form}
            />
          </Form.Item>
        </Form>
      </UpserEventStyles>
    </Skeleton>
  );
}
