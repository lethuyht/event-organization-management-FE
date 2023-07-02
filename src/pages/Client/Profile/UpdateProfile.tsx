import {
  refetchGetMeQuery,
  UserUpdateInput,
  useUpdateMeMutation,
} from '#/generated/schemas';
import { userVar } from '#/graphql/cache';
import PrimaryButton from '#/shared/components/buttons/PrimaryButton';
import UploadAvatar from '#/shared/components/common/UploadAvatar';
import OutlineButton from '#/shared/components/Styled/OutlineButton';
import { showError, showSuccess } from '#/shared/utils/tools';
import { useReactiveVar } from '@apollo/client';
import { Col, Form, Input, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';

function UpdateProfile() {
  const [form] = Form.useForm();
  const userProfile = useReactiveVar(userVar);
  const [isEdit, setIsEdit] = useState(false);

  const [updateProfile, { loading: updateLoading }] = useUpdateMeMutation({
    onCompleted() {
      showSuccess('Thay đổi thông tin cá nhân thành công');
      setIsEdit(false);
    },
    onError: showError,
    refetchQueries: [refetchGetMeQuery()],
  });

  const onSubmit = ({
    avatar,
    firstName,
    lastName,
    phoneNumber,
  }: UserUpdateInput) => {
    isEdit &&
      updateProfile({
        variables: {
          input: {
            ...(firstName ? { firstName } : undefined),
            ...(lastName ? { lastName } : undefined),
            ...(phoneNumber ? { phoneNumber } : undefined),
            ...(avatar ? { avatar } : undefined),
          },
        },
      });
  };

  useEffect(() => {
    form.setFieldsValue(userProfile);
  }, [userProfile, form]);

  return (
    <div className="mb-8 flex flex-col items-center justify-center gap-8">
      <div className="${className} relative mt-32 w-[50%] rounded-2xl bg-[#242424] px-8 px-8 py-12 backdrop-blur-3xl md:w-full">
        <Typography.Title
          className="mt-0 w-full py-3 text-center text-white"
          level={3}
        >
          THÔNG TIN CÁ NHÂN
        </Typography.Title>
        <Form
          form={form}
          onFinish={onSubmit}
          initialValues={{
            firstName: userProfile?.firstName,
            lastName: userProfile?.lastName,
            email: userProfile?.email,
            phoneNumber: userProfile?.phoneNumber,
          }}
        >
          <Row className="justify-center">
            <Col className=" right-0 left-0 flex justify-center">
              <div className="absolute translate-y-6 blur-[40px]">
                <Form.Item name="avatar" valuePropName="src">
                  <UploadAvatar avatarProps={{ size: 100 }} />
                </Form.Item>
              </div>
              <Form.Item name="avatar" valuePropName="src">
                <UploadAvatar avatarProps={{ size: 100 }} />
              </Form.Item>
            </Col>
          </Row>
          <Row className="w-full">
            <Col span={24}>
              <Form.Item
                messageVariables={{ label: 'Email' }}
                hasFeedback
                rules={[
                  {
                    whitespace: true,
                    type: 'email',
                  },
                ]}
                {...(isEdit ? { name: 'email' } : {})}
              >
                <Row>
                  <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
                    <text className="container mx-auto flex h-full items-center text-center indent-8 text-[18px] leading-[3rem]">
                      Email :
                    </text>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={16} xl={16} xxl={16}>
                    <Input
                      className=""
                      disabled
                      placeholder="Nhập email"
                      {...(isEdit
                        ? { value: userProfile?.email }
                        : { value: userProfile?.email ?? '' })}
                      data-testid="email"
                    />
                  </Col>
                </Row>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item rules={[{ whitespace: true }]} name={'firstName'}>
                <Row>
                  <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
                    <text className="container mx-auto flex h-full items-center text-center indent-8 text-[18px] leading-[3rem]">
                      Họ và Tên đệm :
                    </text>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={16} xl={16} xxl={16}>
                    <Input
                      data-testid="firstName"
                      maxLength={255}
                      placeholder="Nhập họ và tên đệm của bạn"
                      disabled={!isEdit}
                      defaultValue={userProfile?.firstName ?? ''}
                    />
                  </Col>
                </Row>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item rules={[{ whitespace: true }]} name={'lastName'}>
                <Row>
                  <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
                    <text className="container mx-auto flex h-full items-center text-center indent-8 text-[18px] leading-[3rem]">
                      Tên :
                    </text>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={16} xl={16} xxl={16}>
                    <Input
                      data-testid="lastName"
                      maxLength={255}
                      placeholder="Nhập tên của bạn"
                      disabled={!isEdit}
                      defaultValue={userProfile?.lastName ?? ''}
                    />
                  </Col>
                </Row>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                rules={[
                  { whitespace: true },
                  {
                    pattern: /^[0-9]*$/,
                    message: 'Vui lòng nhập số điện thoại hợp lệ',
                  },
                ]}
                name={'phoneNumber'}
              >
                <Row>
                  <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
                    <text className="container mx-auto flex h-full items-center text-center indent-8 text-[18px] leading-[3rem]">
                      Số điện thoại :
                    </text>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={16} xl={16} xxl={16}>
                    <Input
                      data-testid="phoneNumber"
                      maxLength={255}
                      placeholder="Nhập số điện thoại"
                      disabled={!isEdit}
                      defaultValue={userProfile?.phoneNumber ?? ''}
                    />
                  </Col>
                </Row>
              </Form.Item>
            </Col>

            <Col span={24} className="mt-8 flex justify-center gap-4">
              {isEdit ? (
                <>
                  <PrimaryButton htmlType="submit" loading={updateLoading}>
                    Lưu
                  </PrimaryButton>
                  <OutlineButton
                    disabled={updateLoading}
                    onClick={() => {
                      form.setFieldsValue(userProfile);
                      setIsEdit(prev => !prev);
                    }}
                  >
                    Hủy
                  </OutlineButton>
                </>
              ) : (
                <OutlineButton
                  onClick={() => setIsEdit(prev => !prev)}
                  className="px-8"
                  data-testid="edit-btn"
                >
                  Chỉnh sửa
                </OutlineButton>
              )}
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default UpdateProfile;
