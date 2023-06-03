import { Email, Password } from '#/assets/svg';
import PrimaryButton from '#/shared/components/buttons/PrimaryButton';
import PageTitle from '#/shared/components/common/PageTitle';
import ClientLayout from '#/shared/components/layout/ClientLayout';
import useAuthentication from '#/shared/hooks/useAuthentication';
import { Col, Form, Input, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';

function SignInForm({ className }: { className: string }) {
    const { handleSignIn, signInLoading } = useAuthentication();

    return (
        <>
            <div className='w-full flex justify-center'>
                <Form
                    onFinish={handleSignIn}
                    layout="vertical"
                    className={`px-8 ${className} w-1/2 rounded-2xl  bg-[#242424]`}
                    scrollToFirstError
                >
                    <Typography.Title className='w-full text-center py-3 mt-3 text-white' level={3}>ĐĂNG NHẬP</Typography.Title>
                    <Row className="mt-10">
                        <Col span={24}>
                            <Form.Item
                                name="email"
                                messageVariables={{ name: "" }}
                                rules={[
                                    {
                                        type: 'email',
                                        required: true,
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Nhập email..."
                                    prefix={
                                        <span className="anticon mr-3">
                                            <Email width={15} height={15} className="text-white" />
                                        </span>
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24} className="mt-4">
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input.Password
                                    className="text-white"
                                    placeholder="Nhập mật khẩu..."
                                    prefix={
                                        <span className="anticon mr-2">
                                            <Password width={20} height={20} className="text-white" />
                                        </span>
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24} className="mt-6">
                            <Form.Item>
                                <PrimaryButton
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    loading={signInLoading}
                                >
                                    Đăng Nhập
                                </PrimaryButton>
                            </Form.Item>
                        </Col>

                        <Col span={24} className="md:mb-6 text-center">
                            <span className="pr-3 text-white">Chưa có tài khoản? </span>
                            <Link
                                to="/sign-up"
                                className="text-white hover:text-orange-500 "
                            >
                                Đăng ký
                            </Link>
                        </Col>
                    </Row>
                </Form>
            </div >
        </>
    );
}

function SignIn() {
    return (
        <ClientLayout>
            <Row align="middle" justify="center" className="">
                <div className="flex-col-center ">
                    <SignInForm className="w-1/2 rounded-2xl bg-[#242424]  py-10 px-8 backdrop-blur-3xl" />
                </div>
            </Row>
        </ClientLayout>
    );
}

export default SignIn;
