import { Tag } from 'antd';
import { ContractStatus } from '#/generated/schemas';

interface Props {
  status: string;
}

export function ContractStatusTag({ status }: Props) {
  switch (status) {
    case ContractStatus.Draft:
      return (
        <Tag color="default" className={'text-black'}>
          Bản nháp
        </Tag>
      );
      break;
    case ContractStatus.DepositPaid:
      return <Tag color="lime">Đã đặt cọc</Tag>;
      break;
    case ContractStatus.InProgress:
      return <Tag color="blue">Đang thực hiện</Tag>;
      break;
    case ContractStatus.WaitingPaid:
      return <Tag color="orange">Chờ thanh toán</Tag>;
      break;
    case ContractStatus.Completed:
      return <Tag color="green">Hoàn thành</Tag>;
      break;
    case ContractStatus.Cancel:
      return <Tag color="volcano">Đã hủy</Tag>;
      break;
    case ContractStatus.AdminCancel:
      return <Tag color="red">Đã hủy bởi Admin </Tag>;
      break;
    default:
      return <></>;
  }
}
