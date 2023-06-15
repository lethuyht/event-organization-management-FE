// import { ServiceItem, useAddItemToCartMutation } from '#/generated/schemas'
// import { userVar } from '#/graphql/cache'
// import { getToken } from '#/shared/utils/token'
// import { showError, showSuccess } from '#/shared/utils/tools'
// import { ROLE } from '#/shared/utils/type'
// import { useReactiveVar } from '@apollo/client'
// import { Button, DatePicker, Form, InputNumber, Modal, Typography } from 'antd'
// import dayjs, { Dayjs } from 'dayjs'
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// interface Props {
//     serviceItem: ServiceItem
//     onChange: () => void
// }


// const { RangePicker } = DatePicker
// type RangeValue = [Dayjs | null, Dayjs | null] | null

// export function AddToCartModal({ serviceItem, onChange }: Props) {
//     const [open, setOpen] = useState(false);
//     const isLoggIn = !!getToken();
//     const user = useReactiveVar(userVar);
//     const navigate = useNavigate();
//     const [form] = Form.useForm()
//     const [dates, setDates] = useState<RangeValue>(null)

//     const disabledDate = (current: Dayjs) => {
//         if (!dates) {
//             return false
//         }
//         const tooLate = dates[0] && current.diff(dates[0], 'days') >= 31
//         const tooEarly = dates[1] && dates[1].diff(current, 'days') >= 31
//         return !!tooEarly || !!tooLate
//     }

//     const handleDateChange = (e: any) => {

//     }



//     const [upsertAddToCart, { loading: upsertLoading }] = useAddItemToCartMutation({
//         onCompleted: () => {
//             showSuccess('Thêm vào giỏ hàng thành công');
//         },
//         onError: error => showError(error),
//     });

//     const handleAddToCart = async (values: any) => {
//         try {
//             upsertAddToCart({
//                 variables: {
//                     input: {
//                         ...values,
//                         serviceItemId: serviceItem.id,
//                         hireDate: values.startDate,
//                         hireEndDate: values.endDate,
//                         amount: values.amount,
//                     },
//                 },
//             });
//             onChange()
//         } catch (error) {
//         }
//         setOpen(false)
//         form.resetFields()
//     }

//     return (
//         <>
//             < Button type="primary" onClick={() => setOpen(true)}>
//                 Thêm vào danh sách
//             </Button >

//             {
//                 isLoggIn && user.role?.name === ROLE.ADMIN ? <></> : isLoggIn && user.role?.name === ROLE.USER ? <Modal
//                     width={500}
//                     title='Thêm dịch vụ vào danh sách'
//                     open={open}
//                     onCancel={() => setOpen(false)}
//                     okText='Thêm'
//                     cancelText='Hủy'
//                     onOk={handleAddToCart}
//                 >
//                     <Form.Item label="Ngày bắt đầu">
//                         <RangePicker
//                             defaultValue={[dayjs(filter.startAt), dayjs(filter.endAt)]}
//                             format='YYYY-MM-DD'
//                             disabledDate={disabledDate}
//                             onCalendarChange={(val) => setDates(val)}
//                             onChange={handleDateChange}
//                         />
//                     </Form.Item>
//                     <Form.Item>
//                         <InputNumber />
//                     </Form.Item>
//                 </Modal>
//                     : <Modal width={500}
//                         title='Đăng nhập'
//                         open={open}
//                         onCancel={() => setOpen(false)}
//                         okText='Đăng nhập'
//                         cancelText='Hủy'
//                         onOk={() => navigate('/sign-in')}>
//                         <Typography.Text>Bạn chưa đăng nhập. Hãy đăng nhập để thực hiện hành động này.</Typography.Text>
//                     </Modal>
//             }

//         </>
//     )
// }

