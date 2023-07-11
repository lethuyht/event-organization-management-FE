import { Col, Image, Layout, Row, Typography } from 'antd';
import ScrollToTopButton from '../../common/ScrollToTop';
import {
  DiscordSVG,
  EmailSVG,
  FacebookSVG,
  InstagramSVG,
  PhoneSVG,
  TwitchSVG,
  TwitterSVG,
} from '#/assets/svg';

const { Footer } = Layout;

export function FooterComponent() {
  return (
    <>
      <Footer className="relative top-[85px] mt-10  w-full items-center  bg-[#00081e] py-5">
        <Row className={'mx-auto w-full max-w-container  '} gutter={[24, 24]}>
          <Col lg={8} md={24}>
            <div className={'w-full text-center'}>
              <Image
                src="https://polaris-event.s3.ap-southeast-1.amazonaws.com/static/logo.png"
                preview={false}
                width={350}
              />
            </div>

            <Typography.Text className={'block text-lg '}>
              Polasris Event là công ty chuyên tổ chức sự kiện hàng đầu tại Việt
              Nam. Với gần 11 năm kinh nghiệm hoạt động, Polaris Event tự hào
              mang đến những giá trị khác biệt cho khách hàng qua từng dự án
            </Typography.Text>
          </Col>
          <Col lg={16} md={24}>
            <Row gutter={[16, 16]}>
              <Col md={12} sm={24}>
                <Typography.Text className={'text-2xl'}>
                  Theo dõi chúng tôi
                </Typography.Text>
                <Row className={'my-4'}>
                  <FacebookSVG
                    width={64}
                    height={64}
                    className="mx-2 mb-2 cursor-pointer text-white hover:text-[#f97316]"
                  />
                  <TwitterSVG
                    width={64}
                    height={64}
                    className="mx-2 mb-2 cursor-pointer text-white hover:text-[#f97316]"
                  />
                  <TwitchSVG
                    width={64}
                    height={64}
                    className="mx-2 mb-2  cursor-pointer text-white hover:text-[#f97316]"
                  />
                  <DiscordSVG
                    width={64}
                    height={64}
                    className="mx-2 mb-2  cursor-pointer text-white hover:text-[#f97316]"
                  />
                  <InstagramSVG
                    width={64}
                    height={64}
                    className="mb-2 cursor-pointer  text-white hover:text-[#f97316]"
                  />
                </Row>
              </Col>
              <Col md={12} sm={24}>
                <Typography.Text className={'text-2xl'}>
                  Liên hệ chúng tôi:
                </Typography.Text>
                <Row className={'my-4'}>
                  <Col span={24} className={'mb-2 flex'}>
                    <EmailSVG width={24} height={24} className={'mr-4'} />
                    <Typography.Text className={'text-lg'}>
                      polarisvn.event@gmail.com
                    </Typography.Text>
                  </Col>
                  <Col span={24} className={'mt-2 flex'}>
                    <PhoneSVG width={24} height={24} className={'mr-4'} />
                    <Typography.Text className={'text-lg'}>
                      +84369314703
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col span={24} className={'mt-4 text-center'}>
            <Typography.Text className="text-lg  text-[#ccc] opacity-50">
              <Typography.Text className="text-lg  text-[#ccc] opacity-50">
                Copyright © 2021
              </Typography.Text>

              <Typography.Text className="mx-2  text-lg text-[#ccc] opacity-50">
                POLARIS EVENT
              </Typography.Text>
              <Typography.Text className="text-lg  text-[#ccc] opacity-50">
                , All rights reserved.
              </Typography.Text>
            </Typography.Text>
          </Col>
        </Row>
      </Footer>
      <ScrollToTopButton />
    </>
  );
}
