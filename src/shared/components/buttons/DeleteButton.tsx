import { DeleteOutlined } from '@ant-design/icons';
import { Tooltip, Modal } from 'antd';

interface Props {
  disabled?: boolean;
  title?: string;
  content: string;
  onDelete: () => void;
}

function DeleteButton({ onDelete, disabled, title, content, ...props }: Props) {
  return (
    <Tooltip title="Xóa" placement="top">
      <DeleteOutlined
        className="scale-[1.5] text-error-color hover:text-primary-color"
        disabled={disabled}
        onClick={() =>
          Modal.confirm({
            maskClosable: true,
            closable: true,
            centered: true,
            onOk() {
              onDelete();
            },
            title: title || 'Đồng ý',
            content: content,
          })
        }
        {...props}
      />
    </Tooltip>
  );
}

export default DeleteButton;
