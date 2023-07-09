import {
  Event,
  EventServiceItem,
  ServiceType,
  useCreateEventRequestMutation,
} from '#/generated/schemas';
import { userVar } from '#/graphql/cache';
import AddressForm from '#/shared/components/common/Address';
import {
  Checkbox,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Radio,
  Row,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomerType } from '../Cart/CreateServiceContract';
import { DatePicker } from '#/shared/components/common/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import PrimaryButton from '#/shared/components/buttons/PrimaryButton';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { NO_IMAGE } from '#/shared/utils/constant';
import { formatCurrency, showError, showSuccess } from '#/shared/utils/tools';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

interface Props {
  event: Event;
}

const { RangePicker } = DatePicker;
type RangeValue = [Dayjs | null, Dayjs | null] | null;

export function CreateEventContract({ event }: Props) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const [showRepresentative, setShowRepresentative] = useState(false);
  const [selectedCustomerType, setSelectedCustomerType] = useState<
    string | undefined
  >(undefined);
  const [isSameCreateAddress, setIsSameCreateAddress] =
    useState<boolean>(false);
  const [eventAddress, setEventAddress] = useState<string | undefined>(
    undefined,
  );
  const [isCustomizedEvent, setIsCustomizedEvent] = useState<boolean>(false);
  const user = userVar();
  const navigate = useNavigate();
  const [dates, setDates] = useState<RangeValue>(null);
  const [checkAll, setCheckAll] = useState(true);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>(
    event?.eventServiceItems?.length
      ? event.eventServiceItems.map(item => item.serviceItemId)
      : [],
  );
  const [amountEdit, setAmountEdit] = useState<boolean>(false);
  const disabledDate = (current: Dayjs) => {
    if (!dates) {
      return current < dayjs().add(1, 'week');
    }

    const tooLate = dates[0] && current.diff(dates[0], 'days') >= 14;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') >= 14;
    return tooEarly || tooLate || current < dayjs().add(1, 'week');
  };

  const handleCustomerTypeChange = (e: any) => {
    setSelectedCustomerType(e.target.value);
    if (e.target.value === CustomerType.COMPANY) {
      setShowRepresentative(true);
    } else {
      setShowRepresentative(false);
      form.setFieldValue('representative', undefined);
    }
  };

  const handleCreateCustomerAddress = (e: any) => {
    if (e.target.value === true) {
      setIsSameCreateAddress(true);
      form.setFieldValue(
        'customerAddress',
        form.getFieldsValue(['address']).address,
      );
    } else {
      setIsSameCreateAddress(false);
      form.setFieldValue('customerAddress', undefined);
    }
  };
  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setSelectedItems(
      e.target.checked && event?.eventServiceItems?.length
        ? event?.eventServiceItems?.map(item => item.serviceItemId)
        : [],
    );
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const onChange = (checkedValues: CheckboxValueType[]) => {
    setSelectedItems(checkedValues as string[]);
    setIndeterminate(
      checkedValues.length < Number(event?.eventServiceItems?.length),
    );

    setCheckAll(checkedValues.length === event?.eventServiceItems?.length);
  };

  const handleSelectServiceItemChange = (e: any) => {
    if (e.target.value === true) {
      setIsCustomizedEvent(true);
    } else {
      setIsCustomizedEvent(false);
    }
    setCheckAll(true);
    setIndeterminate(false);
    setSelectedItems(
      event?.eventServiceItems?.length
        ? event.eventServiceItems.map(item => item.serviceItemId)
        : [],
    );
  };

  const [createEventContract] = useCreateEventRequestMutation({
    onCompleted: data => {
      navigate(`/contract-management/${data.createEventRequest.id}`);
      showSuccess('Tạo hợp đồng thành công');
    },
    onError: error => showError(error),
  });

  const handleCreateContract = async (values: any) => {
    createEventContract({
      variables: {
        input: {
          eventId: event.id,
          address: values.address,
          details: {
            contractName: values.contractName,
            contractCreatedDate: dayjs(values.contractCreatedDate)
              .tz('Asia/Ho_Chi_Minh')
              .format('YYYY-MM-DD HH:mm:ss ZZ'),
            customerInfo: {
              type: values.customerType,
              name: values.customerName,
              phoneNumber: values.phoneNumber,
              address: values.customerAddress,
              representative: values.representative,
            },
          },
          isCustomized: values.isCustomized,
          hireDate: dayjs(values.hireDate[0])
            .tz('Asia/Ho_Chi_Minh')
            .startOf('day')
            .format('YYYY-MM-DD HH:mm:ss ZZ'),
          hireEndDate: dayjs(values.hireDate[1])
            .tz('Asia/Ho_Chi_Minh')
            .endOf('day')
            .format('YYYY-MM-DD HH:mm:ss ZZ'),
          customizedServiceItems: values.isCustomized
            ? selectedItems.map(item => {
                return {
                  serviceItemId: item,
                  amount: Number(values[item].amount),
                };
              })
            : undefined,
        },
      },
    });
  };

  useEffect(() => {}, [amountEdit]);

  return (
    <>
      <PrimaryButton
        className="h-full w-full py-2 px-4 text-xl"
        onClick={() => setVisible(true)}
      >
        Đăng kí tổ chức sự kiện
      </PrimaryButton>
      <Modal
        closable
        width={1500}
        title={
          <Typography.Title level={3} className={'text-[#f97316]'}>
            <ExclamationCircleOutlined className={'mr-4'} />
            Tạo hợp đồng tổ chức sự kiện
          </Typography.Title>
        }
        open={visible}
        onCancel={() => {
          setVisible(false);
          // form.resetFields();
          // setIsSameCreateAddress(false);
          // setEventAddress(undefined);
          // setIsCustomizedEvent(false);
          // setCheckAll(true);
          // setIndeterminate(true);
          // setSelectedItems(
          //   event?.eventServiceItems?.length
          //     ? event.eventServiceItems.map(item => item.id)
          //     : [],
          // );
        }}
        onOk={form.submit}
        okText={'Tạo hợp đồng'}
        cancelText={'Hủy'}
      >
        <Form
          form={form}
          onFinish={handleCreateContract}
          className={'rounded-lg p-4 '}
        >
          <Row gutter={[16, 16]} className={'flex'}>
            <Col
              lg={10}
              md={24}
              className={
                'my-4  rounded-md border-[1px] border-solid border-[#ccc] p-4 shadow-lg'
              }
            >
              <Row>
                <Typography.Title level={4}>
                  Chọn dịch vụ kèm theo của sự kiện
                </Typography.Title>
              </Row>

              <Form.Item
                name={'isCustomized'}
                required
                rules={[
                  {
                    required: true,
                    validator: async (_, value) => {
                      if (!selectedItems.length) {
                        return Promise.reject(
                          new Error('Vui lòng chọn ít nhất một dịch vụ'),
                        );
                      }
                    },
                  },
                ]}
              >
                <Radio.Group
                  defaultValue={isCustomizedEvent}
                  className="mb-4"
                  onChange={handleSelectServiceItemChange}
                >
                  <Radio value={false}>
                    Sử dụng tất cả các dịch vụ do công ty cung cấp
                  </Radio>
                  <Radio value={true}>
                    Chọn và thay đổi số lượng theo mong muốn của bạn
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Row>
                <Col span={24}>
                  <Row
                    gutter={[16, 16]}
                    className="my-3 flex rounded border border-solid border-slate-200 p-3"
                  >
                    <Col span={12} className="flex items-center">
                      <Checkbox
                        name={'checkAll'}
                        indeterminate={indeterminate}
                        onChange={onCheckAllChange}
                        checked={checkAll}
                        disabled={!isCustomizedEvent}
                      >
                        <Typography.Text className="font-bold text-black">{`Tất cả (${event?.eventServiceItems?.length} sản phẩm)`}</Typography.Text>
                      </Checkbox>
                    </Col>
                    <Col span={4} className="flex items-center text-center">
                      <Typography.Text className="font-bold text-black">
                        {' '}
                        Số lượng
                      </Typography.Text>
                    </Col>
                    <Col span={4} className="flex items-center text-center">
                      <Typography.Text className="font-bold text-black">
                        {' '}
                        Đơn giá
                      </Typography.Text>
                    </Col>
                    <Col span={4} className="flex items-center text-center">
                      <Typography.Text className="font-bold text-black">
                        {' '}
                        Thành tiền
                      </Typography.Text>
                    </Col>
                  </Row>
                  <Row>
                    <Checkbox.Group
                      onChange={onChange}
                      value={selectedItems}
                      className="w-full"
                    >
                      {event?.eventServiceItems?.map(
                        (item: EventServiceItem, index: number) => {
                          return (
                            <Row
                              key={index}
                              className="my-3 flex rounded border border-solid border-slate-200 p-3"
                            >
                              <Col
                                span={12}
                                className="flex w-full items-center"
                              >
                                <Checkbox
                                  value={item.serviceItemId}
                                  disabled={!isCustomizedEvent}
                                  className={'flex items-center'}
                                >
                                  <Row className=" flex w-full items-center justify-center">
                                    <Col
                                      span={10}
                                      className={'flex items-center'}
                                    >
                                      <Image
                                        src={
                                          item?.serviceItem?.service
                                            ?.images?.[0] || NO_IMAGE
                                        }
                                        width={100}
                                        height={100}
                                      />
                                    </Col>
                                    <Col span={14}>
                                      <Row className="my-2">
                                        <Typography.Text
                                          className="font-bold uppercase text-black hover:text-[#f97316]"
                                          onClick={() => {
                                            if (
                                              item.serviceItem.service.type ===
                                              ServiceType.Device
                                            ) {
                                              navigate(
                                                `/device/${item.serviceItem.service.id}`,
                                              );
                                            } else {
                                              navigate(
                                                `/human-event/${item.serviceItem.service.id}`,
                                              );
                                            }
                                          }}
                                        >
                                          {item.serviceItem.name}
                                        </Typography.Text>
                                      </Row>
                                    </Col>
                                  </Row>
                                </Checkbox>
                              </Col>
                              <Col
                                span={4}
                                className=" flex w-full items-center justify-center"
                              >
                                {isCustomizedEvent ? (
                                  <Form.Item
                                    name={[item.serviceItemId, 'amount']}
                                    initialValue={item.amount}
                                    rules={[
                                      {
                                        required: true,
                                        type: 'number',
                                        validator: async (_, value) => {
                                          if (!value) {
                                            return Promise.reject(
                                              new Error(
                                                'Vui lòng nhập số lượng',
                                              ),
                                            );
                                          }

                                          if (value < 1) {
                                            return Promise.reject(
                                              new Error(
                                                'Số lượng không được nhỏ hơn 1',
                                              ),
                                            );
                                          }

                                          if (
                                            value >
                                            Number(
                                              item.serviceItem.totalQuantity,
                                            )
                                          ) {
                                            return Promise.reject(
                                              new Error(
                                                `Số lượng tối đa được chọn là ${item.serviceItem.totalQuantity}`,
                                              ),
                                            );
                                          }
                                        },
                                      },
                                    ]}
                                  >
                                    <Input
                                      className={' text-center'}
                                      onChange={() =>
                                        setAmountEdit(!amountEdit)
                                      }
                                    />
                                  </Form.Item>
                                ) : (
                                  <Typography.Text className="flex items-center text-black">
                                    {item.amount}
                                  </Typography.Text>
                                )}
                              </Col>
                              <Col
                                span={4}
                                className=" flex w-full items-center justify-center"
                              >
                                <Typography.Text className="text-black">
                                  {item.serviceItem.price
                                    ? formatCurrency(item.serviceItem.price)
                                    : '-'}
                                </Typography.Text>
                              </Col>
                              <Col
                                span={4}
                                className="flex w-full items-center justify-center"
                              >
                                <Typography.Text className="text-black ">
                                  {item.serviceItem.price
                                    ? formatCurrency(
                                        !isCustomizedEvent
                                          ? item.serviceItem.price * item.amount
                                          : item.serviceItem.price *
                                              (form.getFieldValue(
                                                `${item.serviceItemId}`,
                                              )?.amount || item.amount),
                                      )
                                    : '-'}
                                </Typography.Text>
                              </Col>
                            </Row>
                          );
                        },
                      )}
                    </Checkbox.Group>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col
              lg={14}
              md={24}
              className={
                'my-4 rounded-md border-[1px] border-solid border-[#ccc] p-4 shadow-lg'
              }
            >
              <Row>
                <Typography.Title level={4}>
                  Thông tin hợp đồng
                </Typography.Title>
              </Row>
              <Row>
                <Form.Item
                  name="contractName"
                  label="Tên hợp đồng"
                  required
                  initialValue={'HỢP ĐỒNG TỔ CHỨC SỰ KIỆN'}
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập tên hợp đồng',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={'Địa chỉ tổ chức'}
                  name={'address'}
                  required
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập địa chỉ tổ chức',
                    },
                  ]}
                >
                  <AddressForm
                    onChange={(address: string) => {
                      setEventAddress(address);
                      form.setFieldsValue({ address: address });
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="Thời gian tổ chức"
                  name="hireDate"
                  required
                  rules={[
                    {
                      required: true,
                      validator: async (_, value) => {
                        if (!dates) {
                          return Promise.reject(
                            new Error('Thời gian tổ chức không được để trống'),
                          );
                        }
                      },
                    },
                  ]}
                >
                  <RangePicker
                    format="YYYY-MM-DD"
                    disabledDate={disabledDate}
                    onCalendarChange={val => setDates(val)}
                  />
                </Form.Item>

                <Form.Item
                  label={'Tên khách hàng'}
                  name={'customerName'}
                  required
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập rõ họ tên',
                    },
                  ]}
                  initialValue={`${user?.firstName} ${user?.lastName}`}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={'phoneNumber'}
                  label={'Số điện thoại'}
                  required
                  rules={[
                    {
                      required: true,
                      type: 'string',
                      pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
                      message: 'Vui lòng nhập số điện thoại hợp lệ',
                    },
                  ]}
                  initialValue={user?.phoneNumber}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={'customerType'}
                  label={'Kiểu khách hàng'}
                  required
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn kiểu khách hàng',
                    },
                  ]}
                >
                  <Radio.Group
                    onChange={handleCustomerTypeChange}
                    value={selectedCustomerType}
                  >
                    <Radio value={CustomerType.PERSONAL}>Cá nhân</Radio>
                    <Radio value={CustomerType.COMPANY}>Công ty</Radio>
                  </Radio.Group>
                </Form.Item>
                {showRepresentative && (
                  <Form.Item
                    name={'representative'}
                    label={'Người đại diện'}
                    required
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập tên người đại diện',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                )}

                <Form.Item
                  label={'Địa chỉ khách hàng'}
                  name={'customerAddress'}
                  required
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập địa chỉ khách hàng',
                    },
                  ]}
                >
                  <Radio.Group
                    defaultValue={isSameCreateAddress}
                    onChange={handleCreateCustomerAddress}
                    className="mb-4"
                  >
                    <Radio value={true} disabled={!eventAddress}>
                      Sử dụng địa chỉ tổ chức
                    </Radio>
                    <Radio value={false}>Tạo địa chỉ mới</Radio>
                  </Radio.Group>
                  {!isSameCreateAddress && (
                    <AddressForm
                      onChange={(address: string) => {
                        form.setFieldsValue({ customerAddress: address });
                      }}
                    />
                  )}
                </Form.Item>

                <Form.Item
                  name="contractCreatedDate"
                  label="Ngày tạo hợp đồng"
                  required
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn ngày tạo hợp đồng',
                    },
                  ]}
                  initialValue={dayjs()}
                >
                  <DatePicker
                    className={'contract-created-date'}
                    format={'DD/MM/YYYY'}
                    disabled
                  />
                </Form.Item>
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
