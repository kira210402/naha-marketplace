import { Button, Card } from 'antd';
import { useEffect, useState } from 'react';
import { getListOrderByUserId } from '../../../services/order';
import moment from 'moment';
import DeleteRecord from '../../../components/client/OrderManagementPage/DeleteRecord';

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

  // Group orders by date, then by orderId, and then by storeName
  const groupOrdersByDateAndOrderAndStore = (orders) => {
    const dateGroups = {};

    orders.forEach((order) => {
      const orderDate = moment(order.createdAt).format('YYYY-MM-DD');

      if (!dateGroups[orderDate]) {
        dateGroups[orderDate] = {};
      }

      if (!dateGroups[orderDate][order.orderId]) {
        dateGroups[orderDate][order.orderId] = {
          ...order,
          cartItemsByStore: {},
        };
      }

      order.cartItems.forEach((item) => {
        const storeName = item.storeName;

        if (!dateGroups[orderDate][order.orderId].cartItemsByStore[storeName]) {
          dateGroups[orderDate][order.orderId].cartItemsByStore[storeName] = [];
        }
        dateGroups[orderDate][order.orderId].cartItemsByStore[storeName].push(item);
      });
    });

    return dateGroups;
  };

  const dateGroups = groupOrdersByDateAndOrderAndStore(listOrder);

  return (
    <div style={{ padding: '20px' }}>
      <Card title='Purchase History' style={{ width: '100%' }}>
        {Object.keys(dateGroups).map((date) => (
          <div key={date} className='mb-4'>
            <Card title={`Date: ${date}`} style={{ width: '100%' }}>
              {Object.keys(dateGroups[date]).map((orderId) => {
                const order = dateGroups[date][orderId];
                const cartItemsByStore = order.cartItemsByStore;

                return (
                  <div key={orderId} className='mb-4'>
                    <Card
                      title={`Order Code: ${order.orderId} - Receiver: ${order.receiverName}, Phone: ${order.phoneNumber}, Address: ${order.address}`}
                      style={{ width: '100%' }}
                    >
                      {Object.keys(cartItemsByStore).map((storeName) => (
                        <div key={storeName} className='mb-4'>
                          <Card title={`Store: ${storeName}`} style={{ width: '100%' }}>
                            {cartItemsByStore[storeName].map((item) => {
                              const currentStepId = item.status || 'Pending';
                              const currentStepIndex = steps.findIndex(
                                (step) => step.id === currentStepId
                              );

                              const extra = item.status === 'Pending' ?
                                (
                                  <>
                                    <span className='mr-2 text-red-500'>Cancel</span>
                                    <DeleteRecord data={item} onReload={fetchData} />
                                  </>
                                ) :
                                (
                                  <Button danger disabled>Cancel</Button>
                                );

                              return (
                                <Card
                                  key={item.id}
                                  type='inner'
                                  title={`Product name: ${item.product.name}`}
                                  extra={extra}
                                  className='order-card mb-4'
                                >
                                  <p>
                                    <strong>Price :</strong> {item.product.price} đ
                                  </p>
                                  <p>
                                    <strong>Quantity:</strong> {item.quantity}
                                  </p>
                                  <ol className='flex items-center'>
                                    {item.status !== 'Cancelled' ?
                                      steps.map((step, index) => {
                                        const isActive = index <= currentStepIndex;
                                        return (
                                          <li key={step.id} className='relative mb-6 w-full'>
                                            <div className='flex items-center'>
                                              <div
                                                className={`z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${isActive ? 'bg-blue-600' : step.color
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
                                                className={`font-medium ${isActive ? 'text-blue-600' : 'text-gray-900'
                                                  } dark:text-white`}
                                              >
                                                {step.title}
                                              </h3>
                                            </div>
                                          </li>
                                        );
                                      })
                                      :
                                      <p className='text-red-600'>This item has been canceled</p>
                                    }
                                  </ol>
                                </Card>
                              );
                            })}
                          </Card>
                        </div>
                      ))}
                    </Card>
                  </div>
                );
              })}
            </Card>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default PurchaseHistoryPage;
