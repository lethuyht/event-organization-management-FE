import { Drawer as DrawerAndt } from 'antd';
import { ReactNode } from 'react';

interface Props {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}
function Drawer({ visible, onClose, title, children }: Props) {
  return (
    <DrawerAndt
      title={title}
      onClose={onClose}
      open={visible}
      width="560"
      destroyOnClose
    >
      {children}
    </DrawerAndt>
  );
}
export default Drawer;
