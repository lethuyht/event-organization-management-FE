import { LOGO_SECONDARY, SLIDER_IMAGES } from '#/shared/utils/constant';
import { Card, Col, Image, Row, Typography } from 'antd';
import Slideshow from '../../shared/components/common/SlideShow';

const HomePage = () => {
  return (
    <>
      <Slideshow images={SLIDER_IMAGES.HomePage} />
      <Row
        className={`bg-[#00081e] bg-[url('../src/assets/images/about_us_background.png')]  py-8`}
      >
        <Typography.Title
          className=" w-full text-center text-[rgb(249,115,22)]"
          level={1}
        >
          POLARIS EVENT
        </Typography.Title>

        <Row gutter={[16, 16]} className="flex ">
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <text className="container mx-auto flex h-full items-center px-[40px] text-start indent-8 text-2xl leading-[3rem]">
              Polasris Event là công ty chuyên tổ chức sự kiện hàng đầu tại Việt
              Nam. Với gần 11 năm kinh nghiệm hoạt động và đội ngũ nhân sự giàu
              kinh nghiệm thực tế, Polaris Event tự hào mang đến những giá trị
              khác biệt cho khách hàng qua từng dự án
            </text>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <div className="grid justify-items-center">
              <Image
                src={LOGO_SECONDARY}
                preview={false}
                width={500}
                height={200}
              />
            </div>
          </Col>
        </Row>
      </Row>

      <Row className="mx-auto w-full max-w-container py-8">
        <Typography.Title level={2} className="w-full text-center text-red-500">
          DỊCH VỤ NỔI BẬT
        </Typography.Title>
        <Col span={24} className="">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <Card
                onClick={() => {
                  window.location.href = `/event`;
                }}
                hoverable
                cover={
                  <Image
                    height={300}
                    src="https://polaris-event.s3.ap-southeast-1.amazonaws.com/static/DEFAULT_EVENT.jpg"
                    preview={false}
                  />
                }
              >
                <Typography.Title
                  className="mt-3 w-full py-3 text-center text-black"
                  level={5}
                >
                  DỊCH VỤ TỔ CHỨC SỰ KIỆN TRỌN GÓI
                </Typography.Title>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <Card
                onClick={() => {
                  window.location.href = `/device`;
                }}
                hoverable
                cover={
                  <Image
                    height={300}
                    src="https://polaris-event.s3.ap-southeast-1.amazonaws.com/static/device_item_default.jpg"
                    preview={false}
                  />
                }
              >
                <Typography.Title
                  className="mt-3 w-full py-3 text-center text-black"
                  level={5}
                >
                  DỊCH VỤ CUNG CẤP THIẾT BỊ SỰ KIỆN
                </Typography.Title>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <Card
                onClick={() => {
                  window.location.href = `/human-event`;
                }}
                hoverable
                cover={
                  <Image
                    height={300}
                    src="https://polaris-event.s3.ap-southeast-1.amazonaws.com/static/human_service_default.jpg"
                    preview={false}
                  />
                }
              >
                <Typography.Title
                  className="mt-3 w-full py-3 text-center text-black"
                  level={5}
                >
                  DỊCH VỤ CUNG CẤP NHÂN SỰ SỰ KIỆN
                </Typography.Title>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className=" w-full  bg-[url('https://polaris-event.s3.ap-southeast-1.amazonaws.com/static/why_us_background.jpg')] py-8">
        <Typography.Title level={2} className="w-full text-center text-red-500">
          VÌ SAO CHỌN CHÚNG TÔI
        </Typography.Title>
        <Col span={24} className="">
          <Row gutter={[16, 16]} className="px-8">
            <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <Image
                src="https://polaris-event.s3.ap-southeast-1.amazonaws.com/static/nguon-luc-event-1.png"
                preview={false}
              />
              <Typography.Title
                className="mt-3 w-full py-3 text-center text-2xl text-red-500"
                level={5}
              >
                NGUỒN LỰC POLARIS EVENT
              </Typography.Title>
              <text className="text-xl">
                Với đội ngũ nhân sự hơn 10 năm kinh nghiệm trong ngành sự kiện.
                Nhân sự trẻ, năng động, không ngừng cập nhật những kiến thức
                mới. Luôn tận tâm, lắng nghe, thấu hiểu khách hàng và luôn phục
                vụ hỗ trợ khách hàng chu đáo và tốt nhất
              </text>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <Image
                src="https://polaris-event.s3.ap-southeast-1.amazonaws.com/static/dich-vu-su-kien-chat-luong.png"
                preview={false}
              />
              <Typography.Title
                className="mt-3 w-full py-3 text-center text-2xl text-red-500"
                level={5}
              >
                CHẤT LƯỢNG DỊCH VỤ
              </Typography.Title>
              <text className="text-xl">
                Luôn cung cấp dịch vụ tốt nhất với giá cả cạnh tranh nhất. Đảm
                bảo an toàn tuyệt đối trong dàng dựng trong các tiết mục biểu
                diễn. Dựa trên chi phí khách hàng cung cấp, Vieltink luôn tư vấn
                và cung cấp dịch vụ phù hợp nhất.
              </text>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <Image
                src="https://polaris-event.s3.ap-southeast-1.amazonaws.com/static/co-so-vat-chat-hien-dai.png"
                preview={false}
              />
              <Typography.Title
                className="mt-3 w-full py-3 text-center text-2xl text-red-500"
                level={5}
              >
                CƠ SỞ VẬT CHẤT
              </Typography.Title>
              <text className="text-xl">
                Polaris có kho xưởng cung cấp trọn gói các thiết bị phục vụ cho
                sự kiện: Âm thanh, ánh sáng, bàn, ghế và màn hình LED. Giá cả
                cạnh tranh trên thị trường event. Đặc biệt là xử lý rủi ro và
                phát sinh trong quá trình diễn ra sự kiện.
              </text>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
