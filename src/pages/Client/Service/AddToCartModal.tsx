import {
  ServiceItem,
  refetchGetMyCartQuery,
  useAddItemToCartMutation,
} from '#/generated/schemas';
import { userVar } from '#/graphql/cache';
import { DatePicker } from '#/shared/components/common/DatePicker';
import { getToken } from '#/shared/utils/token';
import { showError, showSuccess } from '#/shared/utils/tools';
import { ROLE } from '#/shared/utils/type';
import { useReactiveVar } from '@apollo/client';
import { Button, Form, Modal, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import Input from 'rc-input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  serviceItem: ServiceItem;
  onChange: () => void;
}

const { RangePicker } = DatePicker;
type RangeValue = [Dayjs | null, Dayjs | null] | null;

export function AddToCartModal({ serviceItem, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const isLoggIn = !!getToken();
  const user = useReactiveVar(userVar);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [dates, setDates] = useState<RangeValue>(null);

  const disabledDate = (current: Dayjs) => {
    return current && current < dayjs().add(5, 'day');
  };

  const [upsertAddToCart] = useAddItemToCartMutation({
    onCompleted: () => {
      showSuccess('Thêm vào giỏ hàng thành công');
    },
    onError: error => showError(error),
    refetchQueries: [refetchGetMyCartQuery()],
  });

  const handleAddToCart = async (values: any) => {
    try {
      upsertAddToCart({
        variables: {
          input: {
            serviceItemId: serviceItem.id,
            hireDate: dayjs(values.hireDate[0]).format('YYYY-MM-DD'),
            hireEndDate: dayjs(values.hireDate[1]).format('YYYY-MM-DD'),
            amount: Number(values.amount),
          },
        },
      });
      onChange();
    } catch (error) {}
    setOpen(false);
    form.resetFields();
  };

  return (
    <>
      {isLoggIn && user.role?.name === ROLE.ADMIN ? (
        <></>
      ) : (
        <Button type="primary" onClick={() => setOpen(true)}>
          Thêm vào danh sách
        </Button>
      )}

      {isLoggIn && user.role?.name === ROLE.USER ? (
        <Modal
          width={500}
          title="Thêm dịch vụ vào danh sách"
          open={open}
          onCancel={() => setOpen(false)}
          okText="Thêm"
          cancelText="Hủy"
          onOk={form.submit}
        >
          <Form form={form} onFinish={handleAddToCart}>
            <Form.Item label="Tên sản phẩm" required>
              <Input value={serviceItem.name} disabled />
            </Form.Item>
            <Form.Item
              className="quantity-input"
              name="amount"
              label="Số lượng"
              initialValue={1}
              rules={[
                {
                  required: true,
                  type: 'number',
                  max: serviceItem?.totalQuantity
                    ? serviceItem.totalQuantity
                    : undefined,
                  min: 1,
                  validator: async (_, value) => {
                    if (!value) {
                      return Promise.reject(
                        new Error('Số lượng không được để trống'),
                      );
                    }

                    if (value <= 0) {
                      return Promise.reject(
                        new Error('Số lượng phải lớn hơn 0'),
                      );
                    }

                    if (
                      serviceItem?.totalQuantity &&
                      value > serviceItem.totalQuantity
                    ) {
                      return Promise.reject(
                        new Error(
                          'Số lượng không được lớn hơn số lượng trong hệ thống. ',
                        ),
                      );
                    }
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Thời gian thuê"
              name="hireDate"
              required
              rules={[
                {
                  required: true,
                  validator: async (_, value) => {
                    console.log('first', value);
                    if (!dates) {
                      return Promise.reject(
                        new Error('Thời gian thuê không được để trống'),
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
          </Form>
        </Modal>
      ) : (
        <Modal
          width={500}
          title="Đăng nhập"
          open={open}
          onCancel={() => setOpen(false)}
          okText="Đăng nhập"
          cancelText="Hủy"
          onOk={() => navigate('/sign-in')}
        >
          <Typography.Text>
            Bạn chưa đăng nhập. Hãy đăng nhập để thực hiện hành động này.
          </Typography.Text>
        </Modal>
      )}
    </>
  );
}
