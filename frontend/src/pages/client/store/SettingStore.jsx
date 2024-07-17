import { Button, Form, Input, Upload, message } from 'antd';
import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { updateStore } from '../../../services/stores';
const SettingStore = ({ store }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      console.log('values', values)
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('phoneNumber', values.phoneNumber);
      formData.append('address', values.address);
      console.log('formData', formData)
      if (fileList.length > 0) {
        formData.append('avatar', fileList[0].originFileObj);
      }

      const response = await updateStore(formData);
      if (response) {
        message.success('Update store success!');
        return response;
      } else message.error('Update store fail');
    } catch (error) {
      message.error('Có lỗi xảy ra!');
    }
  }
  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ textAlign: 'center' }}><b>My store: {store.name}</b></h2>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout='horizontal'
        initialValues={{ ...store }}
        onFinish={handleSubmit}
      >
        <Form.Item label='Avatar'>
          <Upload
            listType='picture'
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label='name'
          name='name'
          rules={[{ required: true, message: "Please input your store's name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='description'
          name='description'
          rules={[{ required: true, message: "Please input your store's description!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Phone'
          name='phoneNumber'
          rules={[
            { required: true, message: 'Please input your phone number!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Address'
          name='address'
          rules={[{ required: true, message: 'Please input your address!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
            Update Store
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SettingStore;
