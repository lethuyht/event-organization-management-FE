import styled from '@emotion/styled';
import {
    Col,
    Form,
    Input,
    Modal,
    Row,
    Select,
    Skeleton,
    Table,
    Tag,
    Tooltip,
    Typography,
} from 'antd';
import {
    Contract,
    ContractStatus,
    ContractType,
    FilterDto,
    QueryOperator,
    useCheckoutRemainBillingContractLazyQuery,
    useConfirmContractDepositMutation,
    useDepositContractLazyQuery,
    useGetContractsQuery,
    useGetMyContractsQuery,
} from '#/generated/schemas';
import {
    formatCurrency,
    showError,
    showSuccess,
    useTable,
} from '#/shared/utils/tools';
import dayjs from 'dayjs';
import { FilterWrapper } from '#/shared/components/common';
import { DatePicker } from '#/shared/components/common/DatePicker';
import { useState } from 'react';
import { ContractStatusTag } from '#/pages/Client/Contract/ContractStatus';
import { DeleteOutlined, DollarOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const MyContractStyles = styled.div`
  .anticon.anticon-eye,
  .anticon-edit {
    padding: 0 10px;

    svg {
      font-size: 25px;
      cursor: pointer;

      &:hover {
        color: #ff9a3c;
      }
    }
  }

  .anticon-dollar {
    padding: 0 10px;

    svg {
      font-size: 25px;
      cursor: pointer;

      &:hover {
        color: #3ce5ff;
      }
    }
  }

  .anticon-delete {
    padding: 0 10px;

    svg {
      font-size: 25px;
      cursor: pointer;

      &:hover {
        color: red;
      }
    }
  }

  .ant-table-content {
    .ant-table-cell-fix {
      &-left {
        background-color: #ffffff !important;
        @media only screen and (max-width: 948px) {
          left: unset !important;
          z-index: unset !important;

          &-last:after {
            bottom: unset !important;
          }
        }
      }

      &-right {
        background-color: #ffffff !important;
        @media only screen and (max-width: 948px) {
          right: unset !important;
          z-index: unset !important;

          &-first:after {
            bottom: unset !important;
          }
        }
      }
    }

    .ant-table-thead .ant-table-cell {
      background-color: #00081e !important;
    }
  }
`;

interface MyContractFilter {
    code?: string;
    status?: number;
    type?: number;
    dates?: string[];
}

const { RangePicker } = DatePicker;

export function ContractAdminPage() {
    const navigate = useNavigate();
    const { pageSize, currentPage, onChange, setCurrentPage } = useTable();
    const [filters, setFilters] = useState<FilterDto[]>([]);
    const { data, loading, refetch } = useGetContractsQuery({
        variables: {
            queryParams: {
                filters: [...filters, {
                    field: 'Contract.status',
                    operator: QueryOperator.Neq,
                    data: ContractStatus.Draft,

                }],
                page: currentPage,
                limit: pageSize,
                orderBy: 'Contract.updatedAt:DESC',
            },
        },
    });

    const [depositContract, { loading: depositLoading }] =
        useDepositContractLazyQuery({
            onCompleted: data => {
                window.open(data.depositContract.checkoutUrl, '_blank');
            },
            onError: error => {
                showError(error);
            },
        });




    const columns = [
        {
            title: 'Mã hợp đồng',
            dataIndex: 'code',
            key: 'code',
            width: 200,
            fixed: 'left',
        },
        {
            title: 'Tên hợp đồng',
            dataIndex: ['details', 'contractName'],
            key: 'contractName',
            ellipsis: true,
            width: 300,
        },
        {
            title: 'Loại hợp đồng',
            dataIndex: 'type',
            key: 'type',
            render: (type: string) => {
                return ContractType.Event === type ? (
                    <Tag color={'green'}>Hợp đồng sự kiện</Tag>
                ) : (
                    <Tag color={'orange'}>Hợp đồng dịch vụ</Tag>
                );
            },
            width: 300,
        },
        {
            title: 'Giá trị hợp đồng',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (totalPrice: number) => (
                <Typography.Text className={'text-black'}>
                    {formatCurrency(totalPrice)}
                </Typography.Text>
            ),
            width: 200,
        },
        {
            title: 'Hiệu lưc hợp đồng',
            width: 300,
            render: (data: Contract) => {
                return (
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Typography.Text className={'text-green-300'}>
                                Ngày bắt đầu:{' '}
                                {`${dayjs(data.hireDate).format('DD / MM / YYYY')}`}
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Typography.Text className={'text-red-400'}>
                                Ngày kết thúc:{' '}
                                {`${dayjs(data.hireEndDate).format('DD / MM / YYYY')}`}
                            </Typography.Text>
                        </Col>
                    </Row>
                );
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                return <ContractStatusTag status={status} />;
            },
            width: 200,
            align: 'center',
        },
        {
            title: 'Hành động',
            key: 'action',
            width: 100,
            fixed: 'right',
            align: 'center',
            render: (data: Contract) => {
                return (
                    <Row className='w-full text-center'>
                        <Tooltip title={'Xem chi tiết'} className='w-full'>
                            <EyeOutlined
                                onClick={() => {
                                    navigate(`/admin/contract-management/${data.id}`);
                                }}
                            />
                        </Tooltip>
                    </Row>
                );
            },
        },
    ];


    const onFilter = ({ code, status, dates, type }: MyContractFilter) => {
        let newFilters: FilterDto[] = [];
        if (code) {
            newFilters.push({
                field: 'Contract.code',
                operator: QueryOperator.Like,
                data: code,
            });
        }
        if (typeof status !== 'undefined') {
            switch (status) {

                case 1:
                    newFilters.push({
                        field: 'Contract.status',
                        operator: QueryOperator.Eq,
                        data: ContractStatus.DepositPaid,
                    });
                    break;
                case 2:
                    newFilters.push({
                        field: 'Contract.status',
                        operator: QueryOperator.Eq,
                        data: ContractStatus.InProgress,
                    });
                    break;
                case 3:
                    newFilters.push({
                        field: 'Contract.status',
                        operator: QueryOperator.Eq,
                        data: ContractStatus.WaitingPaid,
                    });
                    break;
                case 4:
                    newFilters.push({
                        field: 'Contract.status',
                        operator: QueryOperator.Eq,
                        data: ContractStatus.Completed,
                    });
                    break;
                case 5:
                    newFilters.push({
                        field: 'Contract.status',
                        operator: QueryOperator.Eq,
                        data: ContractStatus.Cancel,
                    });
                    break;
                case 6:
                    newFilters.push({
                        field: 'Contract.status',
                        operator: QueryOperator.Eq,
                        data: ContractStatus.AdminCancel,
                    });
                    break;
                default:
            }
        }
        if (typeof type === 'number') {
            switch (type) {
                case 0:
                    newFilters.push({
                        field: 'Contract.type',
                        operator: QueryOperator.Eq,
                        data: ContractType.Event,
                    });
                    break;
                case 1:
                    newFilters.push({
                        field: 'Contract.type',
                        operator: QueryOperator.Eq,
                        data: ContractType.Service,
                    });
                    break;
                default:
            }
        }
        if (dates) {
            newFilters.push(
                {
                    field: 'Contract.hire_date',
                    operator: QueryOperator.Gte,
                    data: dayjs(dates[0]).format('YYYY-MM-DD'),
                },
                {
                    field: 'Contract.hire_end_date',
                    operator: QueryOperator.Lte,
                    data: dayjs(dates[1]).format('YYYY-MM-DD'),
                },
            );
        }

        setFilters(newFilters);
        setCurrentPage(1);
    };

    const [checkoutRemainBilling] = useCheckoutRemainBillingContractLazyQuery({
        onCompleted: data => {
            window.open(data.checkoutRemainBillingContract.checkoutUrl, '_blank');
        },
        onError: error => {
            showError(error);
        },
    });


    return (
        <MyContractStyles>
            <Row
                className="mx-auto  w-full max-w-container px-4 pt-8"
                gutter={[16, 16]}
            >
                <Typography.Title className="text-[#f97316]">
                    DANH SÁCH HỢP ĐỒNG
                </Typography.Title>

                <div className="manage-filter w-full">
                    <FilterWrapper<MyContractFilter> onFilter={onFilter}>
                        <Row gutter={[16, 16]} className={'my-2 w-full'}>
                            <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                                <Form.Item name="code">
                                    <Input placeholder={'Nhập mã hợp đồng'} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                                <Form.Item name={'status'}>
                                    <Select defaultValue={-1}>
                                        <Select.Option value={-1}>Tất cả</Select.Option>
                                        <Select.Option value={1}>Đã đặt cọc</Select.Option>
                                        <Select.Option value={2}>Đang thực hiện</Select.Option>
                                        <Select.Option value={3}>Chờ thanh toán</Select.Option>
                                        <Select.Option value={4}>Hoàn thành</Select.Option>
                                        <Select.Option value={5}>Đã hủy</Select.Option>
                                        <Select.Option value={6}>Bị hủy bởi admin</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                                <Form.Item name={'type'}>
                                    <Select defaultValue={-1}>
                                        <Select.Option value={-1}>Tất cả</Select.Option>
                                        <Select.Option value={0}>Hợp đồng sự kiện</Select.Option>
                                        <Select.Option value={1}>Hợp đồng dịch vụ</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                                <Form.Item name={'dates'} className={'date'}>
                                    <RangePicker className={'w-full'} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </FilterWrapper>
                </div>
                <Skeleton loading={loading}>
                    <Table
                        dataSource={data?.getContracts.items ?? []}
                        columns={columns as any}
                        scroll={{ x: 1000 }}
                        pagination={{
                            total: data?.getContracts.meta.totalItems ?? 0,
                            current: currentPage,
                            showTotal: (total, range) => {
                                return (
                                    <div className="border-gray mr-2 flex items-center rounded-3xl border bg-[white] px-3 text-[#f97316]">{`${range?.[0]}-${range?.[1]}/ ${total}`}</div>
                                );
                            },
                        }}
                        onChange={onChange}
                        className={'w-full'}
                    />
                </Skeleton>
            </Row>
        </MyContractStyles>
    );
}
