import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Space,
} from 'antd';

import { useState } from 'react';
import { createCollection } from '../../../services/collections';

export default function AddProduct(props) {
  const { onReload } = props;
  const { TextArea } = Input;
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const rules = [
    {
      required: true,
      message: 'Trường này là bắt buộc !',
    },
  ];

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCancel = () => {
    setShowModal(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      const response = await createCollection(values);
      if (response.code === 201) {
        message.success('Create product success!');
        onReload();
        setShowModal(false);
        form.resetFields();
        return response;
      } else message.error('Create product fail');
    } catch (error) {
      message.error('Có lỗi xảy ra!');
    }
  };

  return (
    <>
      <Button htmlType='submit' onClick={handleShowModal}>
        + Thêm sản phẩm
      </Button>
      <Modal
        open={showModal}
        onCancel={handleCancel}
        title='Thêm mới Collection'
        footer={null}
      >
        {/* {contextHolder} */}
        <Form
          name='create'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          layout='horizontal'
          style={{ maxWidth: 600 }}
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item label='Tên collection' name='name' rules={rules}>
            <Input />
          </Form.Item>

          <Form.Item label='Mô tả' name='description'>
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Space style={{ float: 'right', width: '100%' }}>
              <Button onClick={handleCancel} className='bg-meta-6'>
                Hủy
              </Button>
              <Button htmlType='submit' className='bg-secondary'>
                Tạo mới
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
