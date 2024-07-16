import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Space,
} from 'antd';

import { useState } from 'react';
import { updateCollection } from '../../../services/collections';
import { EditOutlined } from '@ant-design/icons';

export default function EditRecord(props) {
  const { onReload, collection } = props;
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
      const response = await updateCollection(collection.id, values);
      if (response.code === 200) {
        message.success('Edit product success!');
        onReload();
        setShowModal(false);
        return response;
      } else message.error('Edit product fail');
    } catch (error) {
      message.error('Có lỗi xảy ra!');
    }
  };

  return (
    <>
      <Button htmlType='submit' onClick={handleShowModal} icon={<EditOutlined />} type='text' size='small' />

      <Modal
        open={showModal}
        onCancel={handleCancel}
        title='Edit Collection'
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
          initialValues={collection}
        >
          <Form.Item label='Tên collection' name='name' rules={rules} >
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
                Cập nhật
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
