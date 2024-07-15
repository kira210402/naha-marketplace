import { Button, Flex, Form, Input, Spin, Upload, message } from 'antd';
import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { updateUser } from '../../../services/user';
const UserProfile = ({ user }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [fileList, setFileList] = useState([]);

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('username', values.username);
      formData.append('email', values.email);
      if (fileList.length > 0) {
        formData.append('avatar', fileList[0].originFileObj);
      }

      const response = await updateUser(formData);
      if (response) {
        message.success('Update user success!');
        return response;
      } else message.error('Update user fail');
    } catch (error) {
      message.error('Có lỗi xảy ra!');
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <Flex
        gap='small'
        vertical
        align='center'
        justify='center'
        style={{ minHeight: '100vh' }}
      >
        <Spin size='large' />
      </Flex>
    );
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
      <h2 style={{ textAlign: 'center' }}>My Profile</h2>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout='horizontal'
        initialValues={{ ...user }}
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
          label='Username'
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please input a valid email!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        {/* <Form.Item
          label='Date of Birth'
          name='birthDate'
          rules={[
            { required: true, message: 'Please select your date of birth!' },
          ]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item> */}
        <Form.Item
          label='Phone'
          name='phoneNumber'
          rules={[
            { required: true, message: 'Please input your phone number!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserProfile;
