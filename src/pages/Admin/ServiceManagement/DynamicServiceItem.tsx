import { ServiceItem } from '#/generated/schemas';
import { TextEditor } from '#/shared/components/common/TextEditor';
import { DeepPartial } from '#/shared/utils/type';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Switch,
  Tag,
  Typography,
} from 'antd';
import { FormInstance } from 'antd/es/form/Form';

interface Props {
  initialValues: DeepPartial<ServiceItem>[];
  form: FormInstance<any>;
}

const DynamicServiceItemStyles = styled.div`
  .service-item {
    border: solid 1px #ccc !important;
    border-radius: 0.5rem !important;
    padding: 1rem !important;
    margin-bottom: 1rem !important;

    .ant-input-number {
      width: 100% !important;
      border-radius: 0.5rem !important;

      .ant-input-number-input {
        color: #000 !important;
      }
    }

    .ant-row {
      display: flex !important;
    }
  }
`;
export function DynamicServiceItem({ initialValues, form }: Props) {
  const hanleTextEditorChange = (value: string, index: number) => {
    form.setFieldsValue({
      serviceItems: form
        .getFieldValue('serviceItems')
        .map((item: ServiceItem, i: number) => {
          if (i === index) {
            return {
              ...item,
              description: value,
            };
          }
          return item;
        }),
    });
  };

  return (
    <Form.List name={'serviceItems'} initialValue={initialValues}>
      {(fields, { add, remove }) => (
        <DynamicServiceItemStyles>
          <Row>
            <Col span={24}>
              {fields.map((field, index) => (
                <Row
                  className="service-item flex w-full items-center justify-between"
                  key={field.key}
                >
                  <Col span={24} className="py-3">
                    {initialValues[index]?.id ? (
                      <Form.Item name={[index, 'id']} hidden>
                        <Input value={initialValues?.[index]?.id} />
                      </Form.Item>
                    ) : (
                      <></>
                    )}
                    <Form.Item
                      label="Tên"
                      name={[index, 'name']}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập tên sản phẩm dịch vụ',
                        },
                      ]}
                      initialValue={initialValues[index]?.name ?? undefined}
                    >
                      <Input placeholder="Nhập tên sản phẩm dịch vụ" required />
                    </Form.Item>

                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Form.Item
                          name={[index, 'price']}
                          label="Giá tiền"
                          rules={[
                            {
                              required: true,
                              type: 'number',
                              validator: async (_, value) => {
                                if (!value) {
                                  return Promise.reject(
                                    new Error('Vui lòng nhập giá tiền'),
                                  );
                                }

                                if (value < 0) {
                                  return Promise.reject(
                                    new Error('Giá tiền không được nhỏ hơn 0'),
                                  );
                                }
                              },
                            },
                          ]}
                          initialValue={
                            initialValues[index]?.price ?? undefined
                          }
                        >
                          <InputNumber placeholder="Nhập giá tiền" required />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Số lượng"
                          name={[index, 'totalQuantity']}
                          rules={[
                            {
                              required: true,
                              type: 'number',
                              validator: async (_, value) => {
                                if (!value) {
                                  return Promise.reject(
                                    new Error('Vui lòng nhập số lượng'),
                                  );
                                }

                                if (value < 0) {
                                  return Promise.reject(
                                    new Error('Số lượng không được nhỏ hơn 0'),
                                  );
                                }
                              },
                            },
                          ]}
                          initialValue={
                            initialValues[index]?.price ?? undefined
                          }
                        >
                          <InputNumber placeholder="Nhập số lượng" required />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item
                      name={[index, 'description']}
                      label="Chi tiết"
                      rules={[
                        {
                          required: true,
                          validator: async (_, value) => {
                            if (
                              !value ||
                              value == '' ||
                              value.trim() == '<p></p>'
                            ) {
                              return Promise.reject(
                                new Error(
                                  'Vui lòng nhập chi tiết sản phẩm dịch vụ',
                                ),
                              );
                            }
                          },
                        },
                      ]}
                    >
                      <TextEditor
                        initialValue={initialValues[index]?.description ?? ''}
                        onChange={value => hanleTextEditorChange(value, index)}
                      />
                    </Form.Item>
                    <Form.Item
                      name={[index, 'isPublished']}
                      label="Công khai"
                      valuePropName="checked"
                      initialValue={initialValues[index]?.isPublished ?? false}
                      required
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                  <Row gutter={[32, 32]}>
                    {/* {fields.length > 1 ? (
                  !initialValues[index]?.isUsed ? ( */}
                    <Col span={6}>
                      <Button
                        type="ghost"
                        onClick={() => remove(field.key)}
                        icon={<MinusCircleOutlined />}
                        className="bg-red-600 hover:text-white hover:opacity-50"
                      >
                        <Typography.Text>Xóa</Typography.Text>
                      </Button>
                    </Col>
                    {/* ) : ( */}
                    <Col span={6}>
                      <Tag className="py-1 px-9" color="green">
                        <Typography.Text className="text-lg text-black">
                          Đã được đặt hàng
                        </Typography.Text>
                      </Tag>
                    </Col>
                    {/* )
                ) : (
                  <></>
                )} */}
                  </Row>
                </Row>
              ))}
            </Col>

            <Col span={24} className="center flex justify-end">
              <Button
                type="dashed"
                onClick={() => add()}
                className="mr-2 bg-green-500 px-8 hover:text-white hover:opacity-50"
              >
                <PlusCircleOutlined /> <Typography.Text>Thêm</Typography.Text>
              </Button>
            </Col>
          </Row>
        </DynamicServiceItemStyles>
      )}
    </Form.List>
  );
}
