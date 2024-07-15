import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Upload } from 'antd';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { createNewStore } from '../../../../services/stores';
const StoreForm = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('phoneNumber', values.phoneNumber);
      formData.append('address', values.address);
      if (fileList.length > 0) {
        formData.append('avatar', fileList[0].originFileObj);
      }
      console.log('values', values);
      const response = await createNewStore(formData);
      if (response) {
        message.success('create store success!');
        navigate('/stores/my')
        return response;
      } else message.error('Create store fail');
    } catch (error) {
      message.error('Có lỗi xảy ra!');
    }
  }

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

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
      <h2 style={{ textAlign: 'center', margin: 10 }}><b>Register a new store</b></h2>
      <Form
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 14 }}
        layout='horizontal'
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
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your store's name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please input description!',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: 'Please input phone number!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: 'Please input address!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default StoreForm;