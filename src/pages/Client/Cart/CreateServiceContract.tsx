import PrimaryButton from '#/shared/components/buttons/PrimaryButton';
import dayjs from 'dayjs';
import {
  Card,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Radio,
  Row,
  Typography,
} from 'antd';
import AddressForm from '#/shared/components/common/Address';
import { useState } from 'react';
import { userVar } from '#/graphql/cache';
import { CartItem, useCreateContractMutation } from '#/generated/schemas';
import { NO_IMAGE } from '#/shared/utils/constant';
import { showError, showSuccess } from '#/shared/utils/tools';
import { DatePicker } from '#/shared/components/common/DatePicker';
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface Props {
  onChange: () => void;
  selectedCartItems: string[];
  cartItems: CartItem[];
}

export const CustomerType = {
  PERSONAL: 'person',
  COMPANY: 'company',
};

export function CreateServiceContract({
  onChange,
  selectedCartItems,
  cartItems,
}: Props) {
  const [form] = Form.useForm();
  const [createContractVisible, setCreateContractVisible] = useState(false);
  const [notCreateContractVisible, setNotCreateContractVisible] =
    useState(false);
  const [showRepresentative, setShowRepresentative] = useState(false);
  const [selectedCustomerType, setSelectedCustomerType] = useState<
    string | undefined
  >(undefined);
  const [isSameCreateAddress, setIsSameCreateAddress] =
    useState<boolean>(false);
  const [eventAddress, setEventAddress] = useState<string | undefined>(
    undefined,
  );
  const user = userVar();

  const [createContract] = useCreateContractMutation({
    onCompleted: () => {
      showSuccess('Tạo hợp đồng thành công');
      onChange();
    },
    onError: error => {
      showError(error);
    },
  });

  const handleCustomerTypeChange = (e: any) => {
    setSelectedCustomerType(e.target.value);
    if (e.target.value === CustomerType.COMPANY) {
      setShowRepresentative(true);
    } else {
      setShowRepresentative(false);
      form.setFieldValue('representative', undefined);
    }
  };
  const createContractHandler = () => {
    const selectedItems = cartItems.filter(item =>
      selectedCartItems.includes(item.id),
    );
    let mindHireDate, maxHireEndDate;
    let isValid = true;

    for (const item of selectedItems) {
      const hireDate = dayjs(item.hireDate);
      const hireEndDate = dayjs(item.hireEndDate);

      if (!mindHireDate) {
        mindHireDate = hireDate;
      }
      if (!maxHireEndDate) {
        maxHireEndDate = hireEndDate;
      }

      if (hireEndDate.diff(hireDate, 'days') > 14) {
        isValid = false;
        break;
      }

      if (hireDate.isBefore(mindHireDate)) {
        mindHireDate = hireDate;
      }

      if (hireEndDate.isAfter(maxHireEndDate)) {
        maxHireEndDate = hireEndDate;
      }

      if (
        mindHireDate &&
        maxHireEndDate &&
        maxHireEndDate.diff(mindHireDate, 'days') > 14
      ) {
        isValid = false;
      }

      if (!isValid) {
        setCreateContractVisible(false);
        setNotCreateContractVisible(true);
      } else {
        setCreateContractVisible(true);
        setNotCreateContractVisible(false);
      }
    }
  };

  const handleFormSubmit = (value: any) => {
    createContract({
      variables: {
        input: {
          cartItemIds: selectedCartItems,
          address: value.address,
          details: {
            contractName: value.contractName,
            contractCreatedDate: dayjs(value.contractCreatedDate).format(
              'YYYY-MM-DD',
            ),
            customerInfo: {
              type: value.customerType,
              name: value.customerName,
              phoneNumber: value.phoneNumber,
              representative: value.representative,
              address: value.customerAddress,
            },
          },
        },
      },
    });
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
  return (
    <>
      <PrimaryButton
        disabled={selectedCartItems.length === 0}
        className="h-full w-full py-2 px-4 text-xl"
        onClick={createContractHandler}
      >
        Tạo hợp đồng
      </PrimaryButton>

      <Modal
        closable
        width={1000}
        title={
          <Typography.Title level={3} className={'text-[#f97316]'}>
            <ExclamationCircleOutlined className={'mr-4'} />
            Tạo hợp đồng dịch vụ sự kiện
          </Typography.Title>
        }
        open={createContractVisible}
        onCancel={() => {
          setCreateContractVisible(false);
          form.resetFields();
          setIsSameCreateAddress(false);
          setEventAddress(undefined);
        }}
        onOk={form.submit}
        okText={'Tạo hợp đồng'}
        cancelText={'Hủy'}
      >
        <Row gutter={[16, 16]}>
          <Col lg={10} md={24}>
            <Card
              title={
                <Typography.Title level={4}>
                  Danh sách dịch vụ trong hợp đồng
                </Typography.Title>
              }
              bordered={true}
              className={'shadow-2xl'}
            >
              <Row>
                <Col span={24}>
                  {selectedCartItems.map((item: string, index: number) => {
                    const cartItem = cartItems.find(
                      cartItem => cartItem.id === item,
                    );
                    return (
                      <Row key={index} className="border-b-[1px] py-4">
                        <Col span={10}>
                          <Image
                            src={
                              cartItem?.serviceItem?.service?.images?.[0] ||
                              NO_IMAGE
                            }
                            width={100}
                            height={100}
                          />
                        </Col>
                        <Col span={14}>
                          <Row>
                            <Typography.Text className="font-bold uppercase text-black">
                              {cartItem?.serviceItem?.name}
                            </Typography.Text>
                          </Row>
                          <Row>
                            <Typography.Text className="mr-3 font-bold text-black">
                              Thời gian thuê:
                            </Typography.Text>
                            <Typography.Text className="text-black">
                              {`${dayjs(cartItem?.hireDate).format(
                                'DD/MM/YYYY',
                              )} - ${dayjs(cartItem?.hireEndDate).format(
                                'DD/MM/YYYY',
                              )}`}
                            </Typography.Text>
                          </Row>
                        </Col>
                      </Row>
                    );
                  })}
                </Col>
                )
              </Row>
            </Card>
          </Col>
          <Col lg={14} md={24}>
            {' '}
            <Form
              form={form}
              onFinish={handleFormSubmit}
              className={'rounded-lg p-4 shadow-2xl'}
            >
              <Row>
                <Typography.Title level={4}>
                  Thông tin hợp đồng
                </Typography.Title>
              </Row>
              <Form.Item
                name="contractName"
                label="Tên hợp đồng"
                required
                initialValue={'HỢP ĐỒNG CHO THUÊ DỊCH VỤ SỰ KIỆN'}
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
            </Form>
          </Col>
        </Row>
      </Modal>

      <Modal
        open={notCreateContractVisible}
        title={
          <Typography.Title level={3} className={'text-[#f97316]'}>
            <ExclamationCircleOutlined className={'mr-4'} />
            Thông báo
          </Typography.Title>
        }
        onOk={() => {
          setNotCreateContractVisible(false);
        }}
        onCancel={() => {
          setNotCreateContractVisible(false);
        }}
      >
        <Typography.Text className={'text-black'}>
          Bạn chỉ có thể tạo hợp đồng cho thuê với khoảng thời gian nhỏ hơn 14
          ngày. Nếu bạn muốn thuê lâu hơn, vui lòng tạo nhiều hợp đồng cho thuê
          khác nhau.
        </Typography.Text>
      </Modal>
    </>
  );
}
