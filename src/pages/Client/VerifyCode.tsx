import { CodeVerifyDto, useVerifyCodeMutation } from '#/generated/schemas';
import queryString from 'query-string';
import { showError, showSuccess } from '#/shared/utils/tools';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, Form, Input, Row, Typography } from 'antd';

import { setRefreshToken, setToken, setUserId } from '#/shared/utils/token';
import ClientLayout from '#/shared/components/layout/ClientLayout';
import PrimaryButton from '#/shared/components/buttons/PrimaryButton';

export const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = queryString.parse(location.search) as any;
  const [verifyCodeMutation, { loading, error }] = useVerifyCodeMutation();
  if (error) {
    showError(error.message);
  }

  const onSubmit = ({ code }: CodeVerifyDto) => {
    verifyCodeMutation({
      variables: {
        input: {
          email: decodeURIComponent(email),
          code,
        },
      },
      onCompleted(res) {
        showSuccess('Xác thực thành công');
        setToken(res.verifyCode.token);
        setRefreshToken(res.verifyCode.refreshToken);
        setUserId(res.verifyCode.id);
        navigate('/');
        window.location.reload();
      },
    });
  };
  return (
    <ClientLayout>
      <Row align="middle" justify="center" className="h-3/6 py-24">
        <div
          className="flex w-1/2 flex-col items-center justify-center rounded-3xl bg-[#242424]  px-8 "
          style={{ margin: 'auto' }}
        >
          <br></br>
          <Typography.Title
            level={3}
            className="primary mb-8 text-center text-white"
          >
            XÁC THỰC TÀI KHOẢN
          </Typography.Title>
          <Typography.Text className="mb-4 text-center text-lg">
            Vui lòng kiểm tra email và nhập mã để xác thực tài khoản.
          </Typography.Text>
          <Form onFinish={onSubmit} layout="vertical" className="w-full">
            <Form.Item
              name="code"
              label="Mã xác thực"
              rules={[
                {
                  required: true,
                },
              ]}
              className="pb-4"
            >
              <Input />
            </Form.Item>
            <PrimaryButton
              type="primary"
              block
              className="mt-5"
              htmlType="submit"
              loading={loading}
            >
              Xác thực
            </PrimaryButton>
            <br></br>
          </Form>
        </div>
      </Row>
    </ClientLayout>
  );
};
