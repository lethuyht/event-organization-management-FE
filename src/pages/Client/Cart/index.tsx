import { CartItem, ServiceType, useGetMyCartQuery, useRemoveCartItemMutation } from "#/generated/schemas";
import { NO_IMAGE } from '#/shared/utils/constant';
import { formatCurrency, showError, showSuccess } from '#/shared/utils/tools';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { onError } from "@apollo/client/link/error";
import styled from '@emotion/styled';
import {
  Card,
  Checkbox,
  Col,
  Empty,
  Image,
  Modal,
  Row,
  Skeleton,
  Typography,
} from 'antd';
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import dayjs from "dayjs";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartStyles = styled.div`
  .ant-checkbox-wrapper {
    display: flex;
    align-items: center;

    & > span:nth-of-type(2) {
      width: 100%;
    }
  }

  .anticon-delete {
    color: black;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
  .ant-image{
    width: 100% !important;
    height: 100px;
    padding: 0 10px;
    border-radius: 5px;

    .ant-image-img{
      border-radius: 0.5rem;
    }
  }
`;

export function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [checkAll, setCheckAll] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);
 

  const { loading , refetch} = useGetMyCartQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data=>{
      setCartItems(data.getMyCart.cartItems as CartItem[])
    }
  });

  const [removeCartItem, {loading:removeLoading}]= useRemoveCartItemMutation({
    onCompleted:()=>{
      showSuccess('Xóa sản phẩm thành công')
      refetch()
    },
    onError:(error)=>{
      showError(error)
    }
  })

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setSelectedItems(e.target.checked ? cartItems.map((item) => item.id) : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const onChange = (checkedValues: CheckboxValueType[]) => {
    setSelectedItems(checkedValues as string[]);
    setIndeterminate(
      !!checkedValues.length && checkedValues.length < cartItems.length
    );
    setCheckAll(checkedValues.length === cartItems.length);
};

  return (
    <CartStyles>
      <Row className="mx-auto  max-w-container px-4 pt-8">
        <Skeleton loading={loading}>
          <Col span={24}>
            <Card
              title={
                <Typography.Title level={2} className="text-[#f97316]">
                  CHI TIẾT GIỎ HÀNG
                </Typography.Title>
              }
              bordered={true}
            >
              <Skeleton loading={loading || removeLoading}>
                {
                  cartItems.length > 0 ? <Row>
                    <Col span={24}>
                      <Row gutter={[16,16]} className='p-3 border-solid border-slate-200 border rounded my-3'>
                        <Col span={10} className="flex items-center">
                          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                            <Typography.Text className='text-black font-bold'>{`Tất cả (${cartItems.length} sản phẩm)`}</Typography.Text>
                          </Checkbox>
                        </Col>
                        <Col span={3} className='text-center'>
                          <Typography.Text className='text-black font-bold'> Số lượng</Typography.Text>
                        </Col>
                        <Col span={3} className='text-center'>
                          <Typography.Text className='text-black font-bold'> Đơn giá</Typography.Text>
                        </Col>
                        <Col span={4} className='text-center'>
                          <Typography.Text className='text-black font-bold'> Thành tiền</Typography.Text>
                        </Col>
                        <Col span={4} className='text-center'>
                            <Typography.Text className='text-black font-bold'>Xóa</Typography.Text>
                        </Col>
                      </Row>
                      <Row>
                        <Checkbox.Group onChange={onChange} value={selectedItems} className="w-full" >
                          {
                            cartItems.map((item:CartItem,index:number)=>{
                              return <Row key={index} className='p-3 border-solid border-slate-200 border rounded my-3'>
                                <Col span={10} className="w-full">
                                  <Checkbox  value={item.id}>
                                    <Row className=' flex w-full justify-center items-center'>
                                      <Col span={10}>
                                        <Image 
                                        src={item?.serviceItem?.service?.images?.[0] || NO_IMAGE}
                                        width={100}
                                        height={100}                                        
                                        />
                                      </Col>
                                      <Col span={14}>
                                        <Row className="my-2">
                                          <Typography.Text className='text-black font-bold uppercase hover:text-[#f97316]' onClick={()=>{
                                          if (item.serviceItem.service.type=== ServiceType.Device){
                                            navigate(`/device/${item.serviceItem.service.id}`)
                                          }
                                          else{
                                            navigate(`/human-event/${item.serviceItem.service.id}`)
                                          }
                                        }}>{item.serviceItem.name}</Typography.Text>
                                        </Row>                                    
                                        <Row className="my-2">                                      
                                          <Typography.Text className='text-black font-bold mr-3'>Thời gian thuê:</Typography.Text>
                                          <Typography.Text className='text-black'>
                                            {`${dayjs(item.hireDate).format('DD/MM/YYYY')} - ${dayjs(item.hireEndDate).format('DD/MM/YYYY')}`}
                                          </Typography.Text>
                                        </Row>
                                      </Col>
                                    </Row>
                                  </Checkbox>
                                </Col>
                                <Col span={3} className=' flex w-full justify-center items-center'>
                                  <Typography.Text className='text-black'>
                                  {item.amount}
                                  </Typography.Text>
                                </Col>
                              <Col span={3} className=' flex w-full justify-center items-center'>
                                  <Typography.Text className='text-black'>
                                    {item.serviceItem.price ? formatCurrency(item.serviceItem.price) : '-'}
                                    </Typography.Text>
                                </Col>
                              <Col span={4} className='flex w-full justify-center items-center'>
                                  <Typography.Text className='text-black '>
                                  {item.serviceItem.price ? formatCurrency(item.serviceItem.price*item.amount) : '-'}
                                  </Typography.Text>
                              </Col>
                              <Col span={4} className='flex w-full justify-center items-center'>
                                <Typography.Text> 
                                  <DeleteOutlined onClick={()=>{
                                    Modal.confirm({
                                      title: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
                                      icon: <ExclamationCircleOutlined />,
                                      onOk() {
                                        removeCartItem({
                                          variables:{
                                            cartItemId:item.id
                                          }
                                        })
                                      }

                                    })
                                   
                                  }}/>
                                </Typography.Text>                            
                                </Col>
                              </Row>
                            })
                          }
                        </Checkbox.Group>
                      </Row>
                     
                    </Col>
                  </Row>:<Empty />
                }

              </Skeleton>
            </Card>
          </Col>
        </Skeleton>
      </Row>
    </CartStyles>
  );
}
