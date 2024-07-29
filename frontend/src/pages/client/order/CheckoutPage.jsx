import {
  Button,
  Col,
  Dropdown,
  Flex,
  Form,
  Input,
  message,
  Row,
  Space,
  Spin,
} from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../../../helpers/cookie';
import { jwtDecode } from 'jwt-decode';
import { getUser } from '../../../services/user';
import { setUser } from '../../../redux/features/user';
import { DownOutlined } from '@ant-design/icons';
import { createOrder } from '../../../services/order';
import { useLocation, useNavigate } from 'react-router-dom';
import Address from '../../../components/client/Address/AddressInput';

const CheckoutPage = () => {
  const location = useLocation();
  const selectedCartItems = location.state?.selectedCartItems || [];
  const totalPrice = location.state?.totalPrice || 0;
  const [form] = Form.useForm();
  const data = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [selectedPayment, setSelectedPayment] = useState('Cash');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    const selected = items.find((item) => item.key === key);
    setSelectedPayment(selected.label);
  };

  const items = [
    {
      label: 'Cash',
      name: 'CASH',
      key: '1',
    },
    {
      label: 'VNPay',
      name: 'VN_PAY',
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

  const handleAddressChange = (addressDetails) => {
    form.setFieldsValue({
      address: `${addressDetails.communeLabel}, ${addressDetails.districtLabel}, ${addressDetails.provinceLabel}`,
    });
  };

  const handleSubmit = async (values) => {
    try {
      const formData = {
        receiverName: values.fullName || '',
        phoneNumber: values.phoneNumber || '',
        address: values.address || '',
        payment: selectedPayment || 'CASH',
        cartItemIds: selectedCartItems.map((item) => item.id),
        totalPrice: totalPrice.toFixed(2),
      };
      const response = await createOrder(formData);
      if (response.code === 201) {
        message.success('Create order success!');
        navigate('/')
        return response;
      } else message.error('Create order fail!');
    } catch (error) {
      message.error('Có lỗi xảy ra!');
    }
  };
  return (
    <>
      <div className='container mx-auto p-5'>
        <div className='rounded-lg bg-white p-5 shadow-md'>
          <Row gutter={16} className='flex'>
            <Col span={12} className='flex flex-col'>
              <div className='flex flex-1 flex-col rounded-lg bg-gray-100 p-5'>
                <h3 className='mb-5 text-2xl font-bold text-gray-700'>
                  My Orders
                </h3>
                <div
                  className='flex-1 overflow-auto'
                  style={{ maxHeight: '400px' }}
                >
                  <div className='grid grid-cols-2 gap-4'>
                    {selectedCartItems.map((item, index) => (
                      <div
                        key={index}
                        className='mb-4 flex items-center rounded-lg bg-white p-4 shadow-sm'
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className='mr-4 h-16 w-16 rounded-full object-cover'
                        />
                        <div>
                          <p className='font-medium text-gray-800'>
                            Name: {item.product.name}
                          </p>
                          <p className='text-gray-600'>
                            Quantity: {item.quantity}
                          </p>
                          <p className='text-gray-600'>
                            Price: $
                            {(((item.product.price *
                              (100 - item.product.discount)) /
                              100) *
                              item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <h3 className='mt-6 text-xl font-bold text-gray-700'>
                  Total Price: ${totalPrice.toFixed(2)}
                </h3>
              </div>
            </Col>

            <Col span={12} className='flex flex-col'>
              <div>
                <Address onAddressChange={handleAddressChange} />
              </div>
              <div className='flex flex-1 flex-col rounded-lg bg-gray-100 p-5'>
                <h3 className='mb-5 text-2xl font-bold text-gray-700'>
                  My Infomation
                </h3>
                <Form
                  form={form}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  layout='horizontal'
                  initialValues={{ ...user }}
                  onFinish={handleSubmit}
                  className='flex flex-1 flex-col justify-between'
                >
                  <div>
                    <Form.Item
                      label='Receiver name'
                      name='fullName'
                      rules={[
                        {
                          required: true,
                          message: "Please input receiver's name!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label='Phone Number'
                      name='phoneNumber'
                      rules={[
                        {
                          required: true,
                          message: 'Please input your phone number!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label='Delivery Address'
                      name='address'
                      rules={[
                        {
                          required: true,
                          message: 'Please input your address!',
                        },
                      ]}
                    >
                      <Input placeholder='Enter your address' />
                    </Form.Item>
                    <Form.Item label='Payment Method' wrapperCol={{ span: 24 }}>
                      <Dropdown
                        menu={{
                          items,
                          onClick: handlePaymentClick,
                        }}
                      >
                        <a
                          onClick={(e) => e.preventDefault()}
                          className='inline-flex items-center'
                        >
                          <Space>
                            {selectedPayment}
                            <DownOutlined />
                          </Space>
                        </a>
                      </Dropdown>
                    </Form.Item>
                  </div>
                  <Form.Item wrapperCol={{ span: 24 }}>
                    <Button type='primary' htmlType='submit' className='w-full'>
                      Order
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
