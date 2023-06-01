import { Col, Row, Image, Grid } from 'antd';
import { ReactNode } from 'react';
import login from '#/assets/images/login.png';

interface Props {
  children: ReactNode;
}

function AuthLayout({ children }: Props) {
  const { md } = Grid.useBreakpoint();
  return (
    <Row>
      {md && (
        <Col
          lg={12}
          md={0}
          xs={0}
          className="flex h-screen w-screen justify-center bg-error-color"
        >
          <Row align="middle">
            <div className="flex-col-center">
              <Image preview={false} src={login} />
            </div>
          </Row>
        </Col>
      )}
      <Col
        lg={12}
        md={24}
        xs={24}
        className="flex flex-col px-10 leading-normal"
      >
        {children}
      </Col>
    </Row>
  );
}

export default AuthLayout;
