import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Space,
  Upload,
} from 'antd';

import { useState } from 'react';
import { createProduct } from '../../../services/products';

export default function CreateRecord(props) {
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

  const [fileList, setFileList] = useState([]);

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('price', values.price);
      formData.append('discount', values.discount);
      formData.append('quantity', values.quantity);
      formData.append('description', values.description);

      if (fileList.length > 0) {
        fileList.forEach((file) => {
          formData.append('images', file.originFileObj);
        });
      }

      const response = await createProduct(formData);
      if (response.code === 200) {
        message.success('Successfully edited the product!');
        onReload();
        setShowModal(false);
        form.resetFields();
        return response;
      } else message.error('Create failed');
    } catch (error) {
      message.warning('An error occurred!');
    }
  };

  return (
    <>
      <Button onClick={handleShowModal}>+ Thêm mới</Button>
      <Modal
        open={showModal}
        onCancel={handleCancel}
        title='Thêm mới sản phẩm'
        footer={null}
      >
        <Form
          name='create'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          layout='horizontal'
          style={{ maxWidth: 600 }}
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item label='Tên sản phẩm' name='name' rules={rules}>
            <Input />
          </Form.Item>

          <Form.Item label='Số lượng' name='quantity' rules={rules}>
            <InputNumber />
          </Form.Item>

          <Form.Item label='Giá' name='price' rules={rules}>
            <InputNumber />
          </Form.Item>

          <Form.Item label='Discount' name='discount' rules={rules}>
            <InputNumber />
          </Form.Item>

          <Form.Item label='Images'>
            <Upload
              listType='picture'
              fileList={fileList}
              onChange={handleUploadChange}
              beforeUpload={() => false}
              multiple
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
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
