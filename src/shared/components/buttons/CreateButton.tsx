import { PlusOutlined } from '@ant-design/icons';
import { Button, ButtonProps } from 'antd';

function CreateButton(props: ButtonProps) {
  return (
    <Button icon={<PlusOutlined />} type="primary" {...props}>
      Thêm
    </Button>
  );
}
export default CreateButton;
