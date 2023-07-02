import {
  ContractStatus,
  ContractType,
  useConfirmContractDepositMutation,
  useGetContractQuery,
  useUpdateContractStatusMutation,
} from '#/generated/schemas';
import {
  createEventContract,
  createServiceContractHtml,
} from '#/pages/Client/Contract/ContractDetail';
import { ContractStatusTag } from '#/pages/Client/Contract/ContractStatus';
import styled from '@emotion/styled';
import { Button, Col, Modal, Row, Skeleton, Space, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { ContractInfo } from '#/pages/Client/Contract/ContractInfo';
import { ROLE } from '#/shared/utils/type';
import PrimaryButton from '#/shared/components/buttons/PrimaryButton';
import { DeleteOutlined } from '@ant-design/icons';
import { showError, showSuccess } from '#/shared/utils/tools';
import dayjs from 'dayjs';

const ContractDetailStyle = styled.div`
  .ribbon {
    .ribbon-wrap {
      position: absolute;
      inset: 0px;
      overflow: hidden;
      background-color: transparent;
      pointer-events: none;

      .ribbon-text {
        position: absolute;
        padding: 0.1em 2em;
        z-index: 99;
        text-align: center;
        letter-spacing: 2px;
        font-size: 14px;
        pointer-events: auto;
        box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 3px;
        background-color: red;
        color: rgb(240, 240, 240);
        top: 0px;
        right: 0px;
        transform: translateY(-100%) rotate(90deg) translateX(70.7107%)
          rotate(-45deg);
        transform-origin: right bottom;
      }
    }

    & > div > div {
      padding: 0.5rem 4rem !important;
      font-size: 25px !important;
      color: #fff !important;
      font-weight: bold;

      @media (max-width: 768px) {
        padding: 0.5rem 2rem !important;
        font-size: 16px !important;
      }

      @media (max-width: 576px) {
        padding: 0.5rem 1rem !important;
        font-size: 10px !important;
      }
    }
  }
`;

export function ContractDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, refetch } = useGetContractQuery({
    variables: {
      id: String(id),
    },
  });

  const [confirmContract] = useConfirmContractDepositMutation({
    onCompleted: () => {
      showSuccess('Xác nhận thành công');
      refetch();
    },
    onError: error => showError(error),
  });

  const confirmContractHandler = (isApproved: boolean) => {
    Modal.confirm({
      title: isApproved
        ? 'Xác nhận thực hiện hợp đồng'
        : 'Xác nhận hủy hợp đồng',
      content: isApproved
        ? 'Bạn có chắc chắn muốn thực hiện hợp đồng này?'
        : 'Bạn có chắc chắn muốn hủy hợp đồng này?',
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      onOk: () => {
        confirmContract({
          variables: {
            input: {
              contractId: String(id),
              isApproved: isApproved,
            },
          },
        });
      },
    });
  };

  const [updateContractStatus] = useUpdateContractStatusMutation({
    onCompleted: () => {
      showSuccess('Cập nhật thành công');
      refetch();
    },
    onError: error => showError(error),
  });

  const updateContractStatusHandler = (status: ContractStatus) => {
    Modal.confirm({
      title:
        status === ContractStatus.WaitingPaid
          ? 'Xác nhận yêu cầu thanh toán'
          : status === ContractStatus.Completed
          ? 'Xác nhận hoàn thành hợp đồng'
          : '',
      content:
        status === ContractStatus.WaitingPaid
          ? 'Bạn chắc chắn muốn yêu cầu thanh toán phần còn lại của hợp đồng? Hãy đảm bảo rằng quá trình thực hiện hợp đồng đã hoàn thành!'
          : status === ContractStatus.Completed
          ? 'Bạn có chắc chắn muốn hoàn thành hợp đồng này? Hãy đảm bảo khách hàng đã thanh toán và thực hiện đầy đủ các yêu cầu của hợp đồng!'
          : '',
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      onOk: () => {
        updateContractStatus({
          variables: {
            input: {
              contractId: String(id),
              status: status,
            },
          },
        });
      },
    });
  };

  return (
    <ContractDetailStyle>
      <Typography.Title level={2}>CHI TIẾT HỢP ĐỒNG</Typography.Title>
      <Row className="mx-auto  max-w-container " gutter={[16, 16]}>
        <Col span={24} className="rounded-md bg-[white] drop-shadow-xl ">
          <Skeleton loading={loading}>
            <Row className={'rounded-md p-4'}>
              <Col span={24} className={'my-4 flex justify-between'}>
                <Typography.Title level={5}>
                  Trạng thái:
                  {
                    <span className={'ml-4'}>
                      <ContractStatusTag
                        status={data?.getContract?.status || ''}
                      />
                    </span>
                  }
                </Typography.Title>
                {data?.getContract.status === ContractStatus.DepositPaid && (
                  <div className={'flex justify-end'}>
                    <PrimaryButton onClick={() => confirmContractHandler(true)}>
                      Tiến hành thực hiện
                    </PrimaryButton>
                    <Button
                      block
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        confirmContractHandler(false);
                      }}
                      className=" mx-2 w-32 font-bold text-red-500 hover:bg-red-600 hover:text-white"
                    >
                      Hủy
                    </Button>
                  </div>
                )}
                {data?.getContract.status === ContractStatus.InProgress &&
                  dayjs().isAfter(data.getContract.hireDate) && (
                    <div className={'flex justify-end'}>
                      <PrimaryButton
                        onClick={() =>
                          updateContractStatusHandler(
                            ContractStatus.WaitingPaid,
                          )
                        }
                      >
                        Yêu cầu thanh toán
                      </PrimaryButton>
                    </div>
                  )}
                {data?.getContract?.status === ContractStatus.WaitingPaid &&
                  dayjs().isAfter(data?.getContract?.hireEndDate) && (
                    <div className={'flex justify-end'}>
                      <PrimaryButton
                        onClick={() =>
                          updateContractStatusHandler(ContractStatus.Completed)
                        }
                      >
                        Xác nhận hoàn thành
                      </PrimaryButton>
                    </div>
                  )}
              </Col>
              <Col span={24}>
                <ContractInfo
                  status={data?.getContract?.status as any}
                  userType={ROLE.ADMIN}
                />
              </Col>
            </Row>

            <Space className={'relative my-4 rounded-md'}>
              <div className={'ribbon'}>
                {data?.getContract?.status === ContractStatus.Draft && (
                  <div className={'ribbon-wrap'}>
                    <div className={'ribbon-text bg-black'}>Bản nháp</div>
                  </div>
                )}
                {[ContractStatus.Cancel, ContractStatus.AdminCancel].includes(
                  data?.getContract?.status as any,
                ) && (
                  <div className={'ribbon-wrap'}>
                    <div className={'ribbon-text bg-[red]'}>Đã hủy</div>
                  </div>
                )}
                {![
                  ContractStatus.Cancel,
                  ContractStatus.AdminCancel,
                  ContractStatus.Draft,
                ].includes(data?.getContract?.status as any) && (
                  <div className={'ribbon-wrap'}>
                    <div className={'ribbon-text bg-green-600'}>Chính thức</div>
                  </div>
                )}
              </div>

              {data?.getContract?.type === ContractType.Service ? (
                <div
                  className={'border-[1px] border-solid border-[#000]'}
                  dangerouslySetInnerHTML={{
                    __html: createServiceContractHtml(
                      data?.getContract as any,
                      data?.getContract?.user as any,
                    ),
                  }}
                />
              ) : (
                <div
                  className={'border-[1px] border-solid border-[#000]'}
                  dangerouslySetInnerHTML={{
                    __html: createEventContract(
                      data?.getContract as any,
                      data?.getContract?.user as any,
                    ),
                  }}
                />
              )}
            </Space>
          </Skeleton>
        </Col>
      </Row>
    </ContractDetailStyle>
  );
}
