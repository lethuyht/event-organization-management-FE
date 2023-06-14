import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row, Typography } from 'antd';
import { Rule } from 'antd/lib/form';

function DynamicField({
  initialValues,
  childrenItem,
  name,
  valuePropName,
  rules,
}: {
  initialValues: any[];
  name: string;
  childrenItem: JSX.Element;
  valuePropName: string;
  rules?: Rule;
}) {
  return (
    <Form.List name={name} initialValue={initialValues}>
      {(fields, { add, remove }) => (
        <>
          <Row>
            <Col span={24}>
              {fields.map((field, index) => (
                <Row
                  className="dynamic-item flex w-full items-center justify-between"
                  key={field.key}
                >
                  <Col span={17} className="py-3 ">
                    <Form.Item
                      key={index}
                      name={[index]}
                      valuePropName={valuePropName}
                      className="mb-0 "
                      rules={[{ whitespace: true, ...rules }]}
                    >
                      {childrenItem}
                    </Form.Item>
                  </Col>
                  {fields.length > 1 ? (
                    <Col span={6}>
                      <Button
                        type="ghost"
                        onClick={() => remove(field.name)}
                        icon={<MinusCircleOutlined />}
                        className="bg-red-600 hover:text-white hover:opacity-50"
                      >
                        <Typography.Text>Xóa</Typography.Text>
                      </Button>
                    </Col>
                  ) : (
                    <></>
                  )}
                </Row>
              ))}
            </Col>

            <Col span={24} className="center flex justify-end">
              <Button
                type="dashed"
                onClick={() => add()}
                className="mr-2 bg-green-500 px-8 hover:text-white hover:opacity-50"
              >
                <PlusCircleOutlined /> <Typography.Text>Thêm</Typography.Text>
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Form.List>
  );
}
export default DynamicField;
