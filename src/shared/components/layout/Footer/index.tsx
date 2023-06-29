import { Layout, Typography } from 'antd';
import ScrollToTopButton from '../../common/ScrollToTop';

const { Footer } = Layout;

export function FooterComponent() {
  return (
    <>
      <Footer className="relative top-[85px] mt-10 flex w-full items-center justify-between bg-[#00081e] py-5">
        <Typography.Text className="text-md">
          Copyright © 2021{' '}
          <Typography.Text className="text-md">POLARIS EVENT</Typography.Text>,
          All rights reserved.
        </Typography.Text>
        <Typography.Text className="text-md">
          Coded with{' '}
          <Typography.Text className="text-md"> POLARIS EVENT</Typography.Text>{' '}
        </Typography.Text>
      </Footer>
      <ScrollToTopButton />
    </>
  );
}
