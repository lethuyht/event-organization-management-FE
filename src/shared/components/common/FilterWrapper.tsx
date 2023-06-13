import { Button, Col, Form, Row, Space } from 'antd';
import { PropsWithChildren } from 'react';
import { Eraser } from '#/assets/svg';

interface Props<Type> {
  onFilter: (values: Partial<Type>) => void;
  extraButton?: JSX.Element;
  className?: string;
}

function FilterWrapper<Type>({
  onFilter,
  children,
  extraButton,
  className,
}: PropsWithChildren<Props<Type>>) {
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
    onFilter({});
  };

  return (
    <Form
      className={`flex  items-center justify-between ${className}`}
      form={form}
      onFinish={onFilter}
    >
      <Row className="w-full">
        <Col xs={24} md={24} xl={17}>
          <Row align="middle" gutter={10}>
            {children}
          </Row>
        </Col>
        <Col xs={24} md={24} xl={7} className="flex items-center justify-end">
          <Space size="middle">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Tìm kiếm
              </Button>
            </Form.Item>
            <Form.Item>
              <Button onClick={onReset}>
                <span className="anticon">
                  <Eraser width={16} height={16} />
                </span>
                Xóa bộ lọc
              </Button>
            </Form.Item>
            {extraButton && <Form.Item>{extraButton}</Form.Item>}
          </Space>
        </Col>
      </Row>
    </Form>
  );
}

export default FilterWrapper;
