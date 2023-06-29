import {
  EventServiceItem,
  QueryOperator,
  Service,
  ServiceItem,
  ServiceType,
  useGetServicesQuery,
} from '#/generated/schemas';
import { DeepPartial } from '#/shared/utils/type';
import styled from '@emotion/styled';
import { FormInstance } from 'antd/es/form/Form';
import { Button, Col, Form, Input, Row, Select, Tag, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { showError } from '#/shared/utils/tools';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import PrimaryButton from '#/shared/components/buttons/PrimaryButton';

interface Props {
  initialValues: DeepPartial<EventServiceItem>[];
  form: FormInstance<any>;
  isUsed?: boolean;
}

interface OptionInterface {
  value: string;
  label: string;
}

const DynamicEventServiceItemStyles = styled.div`
  .ant-row {
    display: flex !important;
  }

  .ant-select {
    border: solid 1px #ccc !important;
    border-radius: 0.5rem !important;

    .ant-select-selection-item[title] {
      font-size: 16px !important;
      color: #000 !important;
    }
  }

  .ant-form-item-row {
    display: flex !important;
    flex-direction: column !important;

    .ant-form-item-label {
      display: flex !important;
    }
  }
`;

export function DynamicEventServiceItem({
  initialValues,
  form,
  isUsed,
}: Props) {
  const [serviceSelect, setServiceSelect] = useState<{
    [key: string]: DeepPartial<Service>[];
  }>();
  const [serviceItemSelect, setServiceItemSelect] = useState<{
    [key: string]: DeepPartial<ServiceItem>[];
  }>();
  const [showServiceSelect, setShowServiceSelect] = useState<{
    [key: string]: boolean;
  }>();
  const [showServiceItemSelect, setShowServiceItemSelect] = useState<{
    [key: string]: boolean;
  }>();
  const [showAmountInput, setShowAmountInput] = useState<{
    [key: string]: boolean;
  }>();

  const { data: services, loading: servicesLoading } = useGetServicesQuery({
    variables: {
      query: {
        filters: [
          {
            field: 'Service.is_published',
            operator: QueryOperator.Eq,
            data: 'true',
          },
        ],
        limit: Number.MAX_SAFE_INTEGER,
        page: 1,
      },
    },

    onError: error => showError(error),
  });
  useEffect(() => {
    setServiceSelect(
      initialValues?.reduce((val: { [key: string]: Service[] }, cur, index) => {
        val[index] = services?.getServices?.items?.filter(
          item => item.type === cur.serviceItem?.service?.type,
        ) as any;

        return val;
      }, {}),
    );
    setServiceItemSelect(
      initialValues?.reduce(
        (val: { [key: string]: ServiceItem[] }, cur, index) => {
          val[index] = services?.getServices?.items?.find(
            item => item.id === cur.serviceItem?.serviceId,
          )?.serviceItems as any;
          return val;
        },
        {},
      ),
    );
    setShowServiceItemSelect(
      initialValues?.reduce((val: { [key: string]: boolean }, cur, index) => {
        val[index] = true;
        return val;
      }, {}),
    );

    setShowAmountInput(
      initialValues?.reduce((val: { [key: string]: boolean }, cur, index) => {
        val[index] = true;
        return val;
      }, {}),
    );
    setShowServiceSelect(
      initialValues?.reduce((val: { [key: string]: boolean }, cur, index) => {
        val[index] = true;
        return val;
      }, {}),
    );
  }, [services]);

  const onServiceTypeChange = (value: string, index: number) => {
    const serviceOfType = services?.getServices?.items?.filter(
      item => item.type === value,
    );
    setShowServiceSelect({
      ...showServiceSelect,
      [index]: true,
    });
    setServiceSelect({
      ...serviceSelect,
      [index]: serviceOfType as any,
    });
    setShowServiceItemSelect({
      ...showServiceItemSelect,
      [index]: false,
    });
    setShowAmountInput({
      ...showAmountInput,
      [index]: false,
    });

    form.setFieldsValue({
      eventServiceItems: form
        .getFieldValue('eventServiceItems')
        .map((item: any, i: number) => {
          if (i === index) {
            return {
              serviceType: value,
              serviceId: undefined,
              serviceItemId: undefined,
              amount: undefined,
            };
          }
          return item;
        }),
    });
  };

  const onServiceSelectChange = (value: string, index: number) => {
    const serviceItem = services?.getServices?.items?.find(
      item => item.id === value,
    )?.serviceItems;
    setServiceItemSelect({
      ...serviceItemSelect,
      [index]: serviceItem as any,
    });

    form.setFieldsValue({
      eventServiceItems: form
        .getFieldValue('eventServiceItems')
        .map((item: any, i: number) => {
          if (i === index) {
            return {
              ...item,
              serviceId: value,
              serviceItemId: undefined,
              amount: undefined,
            };
          }
          return item;
        }),
    });

    setShowServiceItemSelect({
      ...showServiceItemSelect,
      [index]: true,
    });
    setShowAmountInput({
      ...showAmountInput,
      [index]: false,
    });
  };
  const onServiceItemSelectChange = (value: string, index: number) => {
    setShowAmountInput({
      ...showAmountInput,
      [index]: true,
    });
  };

  return (
    <Form.List name={'eventServiceItems'} initialValue={initialValues}>
      {(fields, { add, remove }) => (
        <DynamicEventServiceItemStyles>
          <Row className={'py-2'}>
            <Col span={24}>
              {fields.map((field, index) => (
                <Row
                  className=" service-item my-4 flex w-full items-center justify-between rounded-md border-[1px] border-solid border-[#ccc] px-4  pb-8 "
                  key={field.key}
                  gutter={[16, 16]}
                >
                  <Col span={24} className={'mt-2 flex w-full justify-between'}>
                    <Typography.Title className={' text-[#f97316]'} level={5}>
                      Dịch vụ {index + 1}
                    </Typography.Title>
                    {form.getFieldValue('eventServiceItems')?.[index]
                      ?.serviceItemId && (
                      <PrimaryButton
                        onClick={() =>
                          window.open(
                            `/admin/service-management/${
                              form.getFieldValue('eventServiceItems')?.[index]
                                .serviceType === ServiceType.Device
                                ? 'device'
                                : 'human'
                            }/${
                              form.getFieldValue('eventServiceItems')?.[index]
                                .serviceId
                            }`,
                            '_blank',
                          )
                        }
                      >
                        Xem chi tiết
                      </PrimaryButton>
                    )}
                  </Col>

                  <Col span={24}>
                    {initialValues[index]?.id ? (
                      <Form.Item name={[index, 'id']} hidden>
                        <Input value={initialValues?.[index]?.id} />
                      </Form.Item>
                    ) : (
                      <></>
                    )}
                  </Col>
                  <Col lg={4} xl={4} md={12} sm={24}>
                    <Form.Item
                      required
                      name={[index, 'serviceType']}
                      label={'Loại dịch vụ'}
                      initialValue={
                        initialValues?.[index]?.serviceItem?.service?.type
                      }
                    >
                      <Select
                        onChange={value => onServiceTypeChange(value, index)}
                      >
                        <Select.Option value={`${ServiceType.Device}`}>
                          Thiết bị
                        </Select.Option>
                        <Select.Option value={`${ServiceType.HumanResource}`}>
                          Nhân sự
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col lg={7} xl={7} md={12} sm={24}>
                    <Form.Item
                      name={[index, 'serviceId']}
                      label={'Dịch vụ'}
                      required
                      initialValue={
                        initialValues?.[index]?.serviceItem?.service?.id
                      }
                      rules={[
                        {
                          required: true,
                          message: 'Dịch vụ không được để trống',
                        },
                      ]}
                    >
                      <Select
                        options={serviceSelect?.[index]?.map(item => {
                          return {
                            label: item.name,
                            value: item.id,
                          };
                        })}
                        onChange={value => onServiceSelectChange(value, index)}
                        disabled={!showServiceSelect?.[index]}
                      />
                    </Form.Item>
                  </Col>

                  <Col lg={7} xl={7} md={12} sm={24}>
                    <Form.Item
                      label={'Sản phẩm dịch vụ'}
                      required
                      name={[index, 'serviceItemId']}
                      initialValue={initialValues?.[index]?.serviceItemId}
                      rules={[
                        {
                          required: true,
                          message: 'Sản phẩm dịch vụ không được để trống',
                        },
                      ]}
                    >
                      <Select
                        disabled={!showServiceItemSelect?.[index]}
                        options={serviceItemSelect?.[index]?.map(item => {
                          return {
                            label: item.name,
                            value: item.id,
                          };
                        })}
                        onChange={value =>
                          onServiceItemSelectChange(value, index)
                        }
                      />
                    </Form.Item>
                  </Col>

                  <Col lg={6} xl={6} md={12} sm={24}>
                    <Form.Item
                      name={[index, 'amount']}
                      label={'Số lượng'}
                      initialValue={initialValues?.[index]?.amount}
                      required
                      rules={[
                        {
                          required: true,
                          type: 'number',
                          validator: async (_, value) => {
                            if (!value) {
                              return Promise.reject(
                                new Error('Số lượng không được để trống'),
                              );
                            }
                            if (value < 1) {
                              return Promise.reject(
                                new Error('Số lượng phải không hợp lệ'),
                              );
                            }
                            if (
                              value >
                              Number(
                                serviceItemSelect?.[index]?.find(
                                  item =>
                                    item.id ===
                                    form.getFieldValue(`eventServiceItems`)[
                                      index
                                    ]?.serviceItemId,
                                )?.totalQuantity,
                              )
                            ) {
                              return Promise.reject(
                                new Error(
                                  'Không đủ số lượng cung cấp. Vui lòng nhập lại',
                                ),
                              );
                            }
                          },
                        },
                      ]}
                    >
                      <Input disabled={!showAmountInput?.[index]} />
                    </Form.Item>
                  </Col>
                  <Row
                    gutter={[32, 32]}
                    className={'mt-4 flex w-full justify-end'}
                  >
                    {fields.length > 1 ? (
                      index < initialValues.length && isUsed ? (
                        <Col span={6} className={'flex w-full justify-end'}>
                          <Tag className="py-1 px-9" color="green">
                            <Typography.Text className="text-lg text-black">
                              Đang sử dụng
                            </Typography.Text>
                          </Tag>
                        </Col>
                      ) : (
                        <Col span={6} className={'flex w-full justify-end'}>
                          <Button
                            type="ghost"
                            onClick={() => remove(field.key)}
                            icon={<MinusCircleOutlined />}
                            className="bg-red-600 hover:text-white hover:opacity-50"
                          >
                            <Typography.Text>Xóa</Typography.Text>
                          </Button>
                        </Col>
                      )
                    ) : (
                      <></>
                    )}
                  </Row>
                </Row>
              ))}
            </Col>
            <Col span={24} className="center mt-8 flex justify-end">
              <Button
                type="dashed"
                onClick={() => add()}
                className="mr-2 bg-green-500 px-8 hover:text-white hover:opacity-50"
              >
                <PlusCircleOutlined /> <Typography.Text>Thêm</Typography.Text>
              </Button>
            </Col>
          </Row>
        </DynamicEventServiceItemStyles>
      )}
    </Form.List>
  );
}
