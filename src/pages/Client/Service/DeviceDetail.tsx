// import { ServiceItem, useGetServiceQuery } from '#/generated/schemas';
// import { DEVICE_SERVICE_DEFAULT } from '#/shared/utils/constant';
// import styled from '@emotion/styled';
// import {
//   Button,
//   Image,
//   Modal,
//   Row,
//   Table,
//   Typography,
// } from 'antd';
// import { useParams } from 'react-router-dom';
// import { showError, useTable } from '#/shared/utils/tools';
// import { getToken } from '#/shared/utils/token';
// import { AddToCartModal } from './AddToCartModal';


// const DeviceDetailPageStyles = styled.div`
//   .ant-input-affix-wrapper {
//     background-color: white !important;
//     padding: 10px 20px !important;
//     border-radius: 50px !important;

//     input[value] {
//       color: black !important;
//     }

//     .anticon {
//       margin-right: 10px !important;
//       svg {
//         color: black !important;
//         font-size: 20px !important;
//       }
//     }
//   }

//   .ant-card-meta-detail {
//     width: 100%;
//     .ant-card-meta-title {
//       font-size: 16px;
//       font-weight: bold;
//     }
//     .ant-card-meta-description .day {
//       color: orange;
//     }
//   }
//   .ant-table-thead {
//     background-color: #ffff
//   }

//   .ant-table-cell {
//     font-weight: normal !important;
//   }

//   .ant-modal-confirm-content {
//     color: black;
//   }
// `;

// export function DeviceDetailPage() {
//   const { id } = useParams();
//   const isLogin = !!getToken()
//   const { data: service, loading, error } = useGetServiceQuery({
//     variables: {
//       id: id as any,
//     },
//     onError(error) {
//       showError(error);
//     },
//   });
//   const { pageSize, currentPage, onChange, setCurrentPage } = useTable();

//   const columns = [
//     {
//       title: 'Tên thiết bị',
//       dataIndex: 'name',
//       key: 'name',
//       render(name: string) {
//         return (
//           <Row className="flex min-w-[100px] items-center justify-between">
//             <Typography.Text className="text-base text-black">
//               {name}
//             </Typography.Text>
//           </Row>
//         );
//       },
//     },
//     {
//       title: 'Mô tả',
//       dataIndex: 'description',
//       key: 'description',
//       render(price: string) {
//         return (
//           <Row className='flex min-w-[200px] items-center justify-between'>
//             <Typography.Text className="text-base text-black">
//               {price}
//             </Typography.Text>
//           </Row>
//         );
//       },
//     },
//     {
//       title: 'Đơn giá',
//       dataIndex: 'price',
//       key: 'price',
//       render(price: string) {
//         return (
//           <Row className="flex min-w-[50] items-center justify-between">
//             <Typography.Text className="text-base text-black">
//               {price}
//             </Typography.Text>
//           </Row>
//         );
//       },
//     },
//     {
//       title: 'Số lượng sẵn có',
//       dataIndex: 'totalQuantity',
//       key: 'totalQuantity',
//       render(quanlity: string) {
//         return (
//           <Row className="flex min-w-[50] items-center justify-between">
//             <Typography.Text className="text-base text-black">
//               {quanlity}
//             </Typography.Text>
//           </Row>
//         );
//       },
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (record: ServiceItem) => (<AddToCartModal serviceItem={record} onChange={() => { }} />)
//     }
//   ];

//   const handleAddToCart = (record: ServiceItem) => {
//     if (isLogin) {
//       addToCart(record);
//     } else {
//       Modal.confirm({
//         title: 'Thông báo',
//         content: 'Bạn cần đăng nhập để thêm dịch vụ vào danh sách đăng ký dịch vụ.',
//         okText: 'Đăng nhập',
//         cancelText: 'Hủy',
//         onOk: () => {
//           window.location.href = `/sign-in`;
//         },
//       });
//     }
//   };

//   const addToCart = (item: ServiceItem) => {

//   };

//   return (
//     <DeviceDetailPageStyles className="content ">
//       <Row className="mx-auto min-h-[1000px]  w-full max-w-container py-8 ">
//         <Typography.Title level={1} className="w-full text-center text-red-500">
//           {service?.getService.name}
//         </Typography.Title>
//         <Image src={`${service?.getService.images ?? DEVICE_SERVICE_DEFAULT
//           }`} preview={false} />
//       </Row>
//       <Row className="mx-auto min-h-[100px]  w-full max-w-container py-8">
//         <Table
//           dataSource={service?.getService.serviceItems || []}
//           columns={columns}
//           className='border-collapse mb-3 flex justify-center py-2 text-base'
//           scroll={{ x: 1400 }}
//           pagination={false}
//         />
//       </Row>
//     </DeviceDetailPageStyles>
//   );
// };