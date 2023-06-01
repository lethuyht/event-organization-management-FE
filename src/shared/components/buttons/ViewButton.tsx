import { EyeOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

interface Props {
  onClick: () => void;
}
function ViewButton({ onClick }: Props) {
  return (
    <Tooltip title="Xem" placement="top">
      <EyeOutlined
        className="scale-[1.75] text-secondary-color hover:text-primary-color"
        onClick={onClick}
      />
    </Tooltip>
  );
}
export default ViewButton;
