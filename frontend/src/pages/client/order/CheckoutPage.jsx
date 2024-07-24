import { Button, Dropdown, Flex, Form, Input, message, Space, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../../../helpers/cookie';
import { jwtDecode } from 'jwt-decode';
import { getUser } from '../../../services/user';
import { setUser } from '../../../redux/features/user';
import { DownOutlined } from '@ant-design/icons';
import { createOrder } from '../../../services/order';
import { useLocation } from 'react-router-dom';

const CheckoutPage = () => {
  const location = useLocation();
  const selectedCartItems = location.state?.selectedCartItems || [];
  const totalPrice = location.state?.totalPrice || 0;
  const [form] = Form.useForm();
  const data = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [selectedPayment, setSelectedPayment] = useState('Cash');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getCookie('token');
        if (token) {
          const decodedUser = jwtDecode(token);
          const userInfo = await getUser(decodedUser.id);
          dispatch(setUser(userInfo));
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [dispatch]);

  const user = data?.user;

  const handlePaymentClick = ({ key }) => {
    const selected = items.find(item => item.key === key);
    setSelectedPayment(selected.label);
  };

  const items = [
    {
      label: 'Cash',
      key: '1',
    },
    {
      label: 'VNPay',
      key: '2',
    },
  ];

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

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      console.log('values', values);
      formData.append('receiverName', values.fullName || '');
      formData.append('phoneNumber', values.phoneNumber || '');
      formData.append('address', values.address || '');
      formData.append('payment', selectedPayment || 'Cash');
      // const data = {
      //   receiverName: values.fullName,
      //   phoneNumber: values.phoneNumber,
      //   address: values.address,
      //   payment: selectedPayment,
      //   cartItemIds: selectedCartItems.map((item) => item.id),
      // };

      // const response = await createOrder({data: formData, cartItemIds: selectedCartItems.map((item) => item.id)});
      const response = await createOrder({data: formData, cartItemIds: selectedCartItems.map((item) => item.id)});
      if (response.code === 201) {
        message.success('Create order success!');
        return response;
      } else message.error('Create order fail!');
    } catch (error) {
      message.error('Có lỗi xảy ra!');
    }
  }
  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',

      }}
    >
      <h2 style={{ textAlign: 'center' }}><b>My Order Information</b></h2>

      <div style={{ marginTop: '20px' }}>
        <h3><b>My Orders</b></h3>
        {selectedCartItems.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <img src={item.product.images[0]} alt={item.product.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
            <div>
              <p>Name: {item.product.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${((item.product.price * (100 - item.product.discount)) / 100) * item.quantity}</p>
            </div>
          </div>
        ))}
        <h3 style={{ margin: '20px' }}><b>Total Price: ${totalPrice}</b></h3>
      </div>

      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout='horizontal'
        initialValues={{ ...user }}
        onFinish={handleSubmit}
        className='w-screen'
      >
        <Form.Item
          label='Receiver name'
          name='fullName'
          rules={[{ required: true, message: 'Please input receiver;s name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Phone Number'
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

        {/* <Form.Item
          label='Payment method'
          name='payment'
        > */}
          <Dropdown
            menu={{
              items,
              onClick: handlePaymentClick,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {selectedPayment}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        {/* </Form.Item> */}
        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
            Order
          </Button>
        </Form.Item>
      </Form>


    </div>
  );

}

export default CheckoutPage;