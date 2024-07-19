import { EyeOutlined } from '@ant-design/icons';
import { Button, Col, Form, Image, Input, InputNumber, Modal, Row } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import moment from 'moment';
const ViewRecord = (props) => {
  const { data } = props;
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    moment.locale('vi');
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCancel = () => {
    setShowModal(false);
  };
  return (
    <>
      <Button
        title='detail'
        icon={<EyeOutlined />}
        size='small'
        type='text'
        onClick={handleShowModal}
      />

      <Modal
        open={showModal}
        onCancel={handleCancel}
        title='Thông tin chi tiết'
        footer={null}
      >
        <Form
          name='create'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          layout='horizontal'
          style={{ maxWidth: 600 }}
          form={form}
          initialValues={{ ...data }}
          disabled
        >
          <Form.Item label='Tên sản phẩm' name='name'>
            <Input />
          </Form.Item>

          <Form.Item label='Số lượng' name='quantity'>
            <InputNumber />
          </Form.Item>

          <Form.Item label='Giá' name='price'>
            <InputNumber />
          </Form.Item>

          <Form.Item label='Discount' name='discount'>
            <InputNumber />
          </Form.Item>

          <Form.Item label='Images'>
            <Row gutter={[16, 16]}>
              {data.images?.map((image, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={6}>
                  <Image src={image} alt={data.name} />
                </Col>
              ))}
            </Row>
          </Form.Item>

          <Form.Item label='Mô tả' name='description'>
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ViewRecord;
