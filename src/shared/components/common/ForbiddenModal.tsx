import { Modal, Typography } from 'antd';
import { Dispatch, SetStateAction } from 'react';

function ForbiddenModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Modal
      title={<Typography.Title level={3}>Sorry</Typography.Title>}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      open={open}
    >
      <Typography.Text className=" text-black hover:text-red-600">
        This feature is not available for account registered with your role.
        Please login with another account.
      </Typography.Text>
    </Modal>
  );
}
export default ForbiddenModal;
