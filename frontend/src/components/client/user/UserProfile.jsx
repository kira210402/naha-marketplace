import { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import fetchUserInfo from '../../../services/user';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await fetchUserInfo(); 
        setUserInfo(data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    getUserInfo();
  }, []);

  const onFinish = async (values) => {
    console.log('Received values:', values);
    try {
      // const updatedUserInfo = await updateUser(values);
      // console.log('Updated user info:', updatedUserInfo);
    } catch (error) {
      console.error('Failed to update user info:', error);
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* <div>
        <h1>Welcome, {userInfo.name}</h1>
        <p>Email: {userInfo.email}</p>
      </div> */}
      <Form
        initialValues={{
          username: userInfo.name,
          user: {
            email: userInfo.email,
            age: userInfo.age,
            website: userInfo.website,
            introduction: userInfo.introduction,
          },
        }}
        onFinish={onFinish}
      >
        <Form.Item name='username' label='Name' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'email']}
          label='Email'
          rules={[{ type: 'email', required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'age']}
          label='Age'
          rules={[{ type: 'number', min: 0, max: 99 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name={['user', 'website']} label='Website'>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'introduction']} label='Introduction'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UserProfile;
