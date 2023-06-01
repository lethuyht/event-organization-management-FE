import { EditOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

interface Props {
  onClick: () => void;
  disabled?: boolean;
}
function EditButton({ onClick, disabled, ...props }: Props) {
  return (
    <Tooltip title="Cập nhật" placement="top">
      <EditOutlined
        className="scale-[1.5] text-secondary-color hover:text-primary-color"
        onClick={onClick}
        disabled={disabled}
        {...props}
      />
    </Tooltip>
  );
}

export default EditButton;
