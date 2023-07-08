import { ContractStatus } from '#/generated/schemas';
import { ROLE } from '#/shared/utils/type';
import { Alert, Typography } from 'antd';

interface Props {
  status: string;
  userType: string;
}

export function ContractInfo({ status, userType }: Props) {
  if (userType === ROLE.USER) {
    return status === ContractStatus.Draft ? (
      <Alert
        showIcon
        type={'warning'}
        message={
          'Hơp đồng của bạn chưa được đặt cọc. Vui lòng đặt cọc trong vòng 3 ngày kể từ ngày tạo hợp đồng. Nếu không có hành động nào tiếp theo, hợp đồng của bạn sẽ bị hủy sau 3 ngày.  '
        }
      />
    ) : status === ContractStatus.DepositPaid ? (
      <Alert
        showIcon
        type={'info'}
        message={
          'Hợp đồng đã được đặt cọc thành công. Hợp đồng sẽ được hệ thống xem xét và tiến hành thực hiện. Hợp đồng sẽ được Admin của hệ thống quyết định tiến hành quá trình thực hiện hay không. Khi hợp đồng không được thực hiện, số tiền đặt cọc hợp đồng sẽ được hoàn trả về tài khoản của bạn. '
        }
      ></Alert>
    ) : status === ContractStatus.InProgress ? (
      <Alert
        showIcon
        type={'success'}
        message={'Hợp đồng đang được tiến hành thực hiện.'}
      ></Alert>
    ) : status === ContractStatus.WaitingPaid ? (
      <Alert
        showIcon
        type={'warning'}
        message={
          'Hợp đồng đã được thực hiện xong. Vui lòng thanh toán số tiền còn lại theo đúng hợp đồng đã tạo.'
        }
      ></Alert>
    ) : status === ContractStatus.Cancel ? (
      <Alert showIcon type={'error'} message={'Hợp đồng đã bị hủy.'}></Alert>
    ) : status === ContractStatus.AdminCancel ? (
      <Alert
        showIcon
        type={'error'}
        message={
          'Hợp đồng đã bị hủy bởi hệ thống. Trong trường hợp bạn đã đặt cọc, vui lòng kiểm tra lại trong tài khoản hoặc nhấn vào chi tiết hóa đơn để xem chi tiết. Nếu có thắc mắc, cin vui lòng liên hệ hệ thống của chúng tôi. Xin cảm ơn!'
        }
      ></Alert>
    ) : status === ContractStatus.Completed ? (
      <Alert
        showIcon
        type={'success'}
        message={
          'Hợp đồng đã hoàn thành. Cảm ơn bạn đã tin tưởng và lựa chọn hệ thống như một người bạn tin cậy.'
        }
      ></Alert>
    ) : (
      <></>
    );
  }
  return status === ContractStatus.DepositPaid ? (
    <Alert
      showIcon
      type={'warning'}
      message={
        <Typography.Text className="text-black">
          Hợp đồng đã được đặt cọc thành công. Vui lòng xem xét và tiến hành
          thực hiên hợp đồng. Chuyển trạng thái của hợp đồng thành{' '}
          <span className={'font-bold text-blue-600'}>Đang thực hiện</span> để
          tiến hành thực hiện hợp đồng. Nếu không chuyển trạng thái của hợp đồng
          trước ngày hợp đồng bắt đầu, hợp đồng sẽ được hệ thống tự hủy và tiền
          đặt cọc sẽ được hoàn về phía người thuê!
        </Typography.Text>
      }
    ></Alert>
  ) : status === ContractStatus.InProgress ? (
    <Alert
      showIcon
      type={'info'}
      message={
        <Typography.Text className="text-black">
          Hợp đồng đang thực hiện. Hệ thống sẽ tự động chuyển trạng thái sáng{' '}
          <span className="font-bold text-orange-500">Chờ thanh toán</span> khi
          đến ngày kết thúc thực hiện hợp đồng.
        </Typography.Text>
      }
    ></Alert>
  ) : status === ContractStatus.WaitingPaid ? (
    <Alert
      showIcon
      type={'warning'}
      message={
        'Hợp đồng đã được thực hện xong và đang chờ khách hàng thanh toán phần còn lại.'
      }
    ></Alert>
  ) : status === ContractStatus.Cancel ? (
    <Alert
      showIcon
      type={'error'}
      message={'Hợp đồng đã bị hủy từ phía khách hàng!'}
    ></Alert>
  ) : status === ContractStatus.AdminCancel ? (
    <Alert
      showIcon
      type={'error'}
      message={'Hợp đồng đã bị hủy từ phía của hệ thống!'}
    ></Alert>
  ) : status === ContractStatus.Completed ? (
    <Alert
      showIcon
      type={'success'}
      message={'Hợp đồng đã hoàn thành!'}
    ></Alert>
  ) : (
    <></>
  );
}
