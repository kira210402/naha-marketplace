import { Card } from 'antd';
import { useEffect, useState } from 'react';
import { getListOrderByUserId } from '../../../services/order';
import moment from 'moment';

const steps = [
  { id: 'Pending', title: 'Pending', color: 'bg-gray-300' },
  { id: 'Processing', title: 'Processing', color: 'bg-gray-300' },
  { id: 'Delivering', title: 'Delivering', color: 'bg-gray-300' },
  { id: 'Delivered', title: 'Delivered', color: 'bg-gray-300' },
];

const PurchaseHistoryPage = () => {
  const [listOrder, setListOrders] = useState([]);

  const fetchData = async () => {
    try {
      const data = await getListOrderByUserId();
      console.log('data', data.orders);
      const formattedData = data.orders.map((order) => ({
        ...order,
        key: order.id,
        orderId: order.id,
        date: moment(order.createdAt).format('YYYY-MM-DD'),
      }));

      formattedData.sort((a, b) => moment(b.date).diff(moment(a.date)));

      setListOrders(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Card title='Purchase History' style={{ width: '100%' }}>
        {listOrder.map((order) => {
          const cartItems = order.cartItems;
          let currentStepId = 'Pending';
          if (cartItems.length > 0) {
            currentStepId = cartItems[0].status; // Assuming the status of the order is derived from the first cart item
          }

          const currentStepIndex = steps.findIndex(
            (step) => step.id === currentStepId,
          );

          return (
            <Card
              key={order.id}
              type='inner'
              title={`Order Code: ${order.orderId}`}
              extra={<a href='#'>More</a>}
              className='order-card mb-4'
            >
              <ol className='flex items-center'>
                {steps.map((step, index) => {
                  const isActive = index <= currentStepIndex;
                  return (
                    <li key={step.id} className='relative mb-6 w-full'>
                      <div className='flex items-center'>
                        <div
                          className={`z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                            isActive ? 'bg-blue-600' : step.color
                          } ring-0 ring-white sm:ring-8 dark:ring-gray-900`}
                        >
                          <svg
                            className='h-2.5 w-2.5 text-white'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 16 12'
                          >
                            <path
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M1 5.917 5.724 10.5 15 1.5'
                            />
                          </svg>
                        </div>
                        {index < steps.length - 1 && (
                          <div className='flex h-0.5 w-full bg-gray-200 dark:bg-gray-700'></div>
                        )}
                      </div>
                      <div className='mt-3'>
                        <h3
                          className={`font-medium ${
                            isActive ? 'text-blue-600' : 'text-gray-900'
                          } dark:text-white`}
                        >
                          {step.title}
                        </h3>
                      </div>
                    </li>
                  );
                })}
              </ol>
              <p>
                <strong>Product name: </strong> {order.cartItems[0].product.name}
              </p>
              <p>
                <strong>Total Price:</strong> {order.totalPrice} đ
              </p>
              <p>
                <strong>Receiver:</strong> {order.receiverName}
              </p>
              <p>
                <strong>Phone:</strong> {order.phoneNumber}
              </p>
              <p>
                <strong>Address:</strong> {order.address}
              </p>
              <p>
                <strong>Date:</strong> {order.date}
              </p>
            </Card>
          );
        })}
      </Card>
    </div>
  );
};

export default PurchaseHistoryPage;
