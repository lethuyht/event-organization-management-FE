import {
    ContractStatus,
    useGetContractQuery
} from '#/generated/schemas';
import { createServiceContractHtml } from '#/pages/Client/Contract/ContractDetail';
import { ContractStatusTag } from '#/pages/Client/Contract/ContractStatus';
import styled from '@emotion/styled';
import {
    Card,
    Col,
    Row,
    Skeleton,
    Space,
    Typography
} from 'antd';
import { useParams } from 'react-router-dom';

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


    return (
        <ContractDetailStyle>
            <Row className="mx-auto  max-w-container px-4 py-8" gutter={[16, 16]}>
                <Col span={24} className="drop-shadow-xl">
                    <Card
                        title={
                            <Typography.Title level={3} className="text-[#f97316]">
                                CHI TIẾT HỢP ĐỒNG
                            </Typography.Title>
                        }
                        bordered={true}
                    >
                        <Skeleton loading={loading}>
                            <Row className={'rounded-md p-4 '}>
                                <Col span={24} className={'flex justify-between'}>
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
                                                <div className={'ribbon-text bg-green-600'}>
                                                    Chính thức
                                                </div>
                                            </div>
                                        )}
                                </div>

                                <div
                                    className={'border-[1px] border-solid border-[#000]'}
                                    dangerouslySetInnerHTML={{
                                        __html: createServiceContractHtml(
                                            data?.getContract as any,
                                            data?.getContract?.user as any,
                                        ),
                                    }}
                                />
                            </Space>
                        </Skeleton>
                    </Card>
                </Col>
            </Row>
        </ContractDetailStyle>
    );
}


