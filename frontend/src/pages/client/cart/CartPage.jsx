import { useEffect, useState } from 'react';
import { getCartItems } from '../../../services/cart';
import { useDispatch } from 'react-redux';
import { getCookie } from '../../../helpers/cookie';
import { jwtDecode } from 'jwt-decode';
import { getUser } from '../../../services/user';
import { setUser } from '../../../redux/features/user';
// import { Link } from 'react-router-dom';
import { Button, InputNumber, Space, Table } from 'antd';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getCookie('token');
        if (token) {
          const decodedUser = jwtDecode(token);
          const userInfo = await getUser(decodedUser.id);
          dispatch(setUser(userInfo));

          const cartResponse = await getCartItems();

          setCartItems(cartResponse.products);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // const handleRemoveItem = (id) => {
  //   setCartItems(cartItems.filter((item) => item.id !== id));
  // };

  // const handleQuantityChange = (id, delta) => {
  //   setCartItems(
  //     cartItems.map((item) =>
  //       item.product.id === id
  //         ? { ...item, quantity: item.quantity + delta }
  //         : item,
  //     ),
  //   );
  // };

  // const cartItemBody = cartItems.map((item) => ({
  //   id: item.id,
  //   quantity: item.quantity,
  // }));

  // const handleSave = async () => {
  //   const response = await updateCart(cartItemBody);
  //   setCartItems(response.products);
  // };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const columns = [
    {
      title: <div style={{ fontSize: '0.9rem' }}>STT</div>,
      dataIndex: 'index',
      key: 'index',
      width: 60,
      render: (_, record, index) => (
        <div style={{ fontSize: '1rem' }}>{index + 1}</div>
      ),
    },
    {
      title: <div style={{ fontSize: '1rem' }}>Image</div>,
      dataIndex: 'images',
      width: 80,
      key: 'images',
      render: (text, record) => {
        const images = record.product.images;
        return images !== null ? <img src={images[0]} /> : <></>;
      },

      ellipsis: true,
    },
    {
      title: <div style={{ fontSize: '1rem' }}>Name</div>,
      dataIndex: 'name',
      key: 'name',
      width: 250,
      sorter: (a, b) => a.product.name.localeCompare(b.product.name),
      ellipsis: true,
      render: (text, record) => {
        return <div>{record.product.name}</div>;
      },
    },
    {
      title: <div style={{ fontSize: '1rem' }}>Unit Price ( $ )</div>,
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      width: 150,
      render: (text, record) => {
        const price = record.product.price;
        const discount = record.product.discount;
        return (
          <div className='flex gap-2'>
            <span className='text-gray-400 line-through'>
              ${record.product.price}
            </span>
            <p>${(price * (100 - discount)) / 100}</p>
          </div>
        );
      },
      ellipsis: true,
    },
    {
      title: <div style={{ fontSize: '1rem' }}>Quantity</div>,
      dataIndex: 'quantity',
      key: 'quantity',
      width: 150,
      sorter: (a, b) => parseInt(a.quantity, 10) - parseInt(b.quantity, 10),
      render: (text, record) => {
        return (
          <>
            <Space>
              <InputNumber
                defaultValue={record.quantity}
                min={1}
                max={record.product.quantity}
                // onChange={onChange}
              />
            </Space>
          </>
        );
      },
      ellipsis: true,
    },
    {
      title: <div style={{ fontSize: '1rem' }}>Price ( $ )</div>,
      dataIndex: 'price',
      key: 'price',
      width: 130,
      render: (text, record) => {
        const price = record.product.price;
        const discount = record.product.discount;
        const quantity = record.quantity;
        return (
          <div>
            <p>${((price * (100 - discount)) / 100) * quantity} </p>
          </div>
        );
      },
      ellipsis: true,
    },
    {
      title: 'Actions',
      width: 100,
      key: 'actions',
      dataIndex: 'actions',
      render: (text, record) => {
        console.log(text, record);
        return (
          <>
            <Button danger>Hủy</Button>
          </>
        );
      },
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  return (
    <>
      <Table
        columns={columns}
        rowSelection={{
          ...rowSelection,
        }}
        dataSource={cartItems}
        rowKey={'id'}
        pagination={false}
      />
      <div className='mx-6 flex place-content-end gap-4 py-4 text-2xl font-bold'>
        <p>Total Price: ${totalPrice}</p>
        <Button type='primary'>Thanh toán</Button>
      </div>
    </>
  );
};

export default CartPage;

{
  /* <div className='flex min-h-screen flex-col items-center bg-gray-100'>
        <div className='container mx-auto p-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='rounded bg-white p-4 shadow'>
              <div className='flex justify-between'>
                <h2 className='mb-4 text-xl font-bold'>Shopping Cart</h2>
                <button
                  type='button'
                  className='mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className='mb-4 flex items-center justify-between'
                >
                  <div>
                    <h3 className='text-lg'>{item.product.name}</h3>
                    <p className='text-sm text-gray-600'>
                      ${item.product.price} x {item.quantity}
                    </p>
                  </div>
                  <div className='flex items-center'>
                    <button
                      onClick={() => handleQuantityChange(item.product.id, -1)}
                      disabled={item.quantity <= 1}
                      className='rounded bg-red-500 px-2 py-1 text-white'
                    >
                      -
                    </button>
                    <span className='mx-2'>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.product.id, 1)}
                      className='rounded bg-green-500 px-2 py-1 text-white'
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.product.id)}
                      className='ml-4 rounded bg-red-500 px-2 py-1 text-white'
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className='rounded bg-white p-4 shadow'>
              <h2 className='mb-4 text-xl font-bold'>Order Summary</h2>
              <div className='mb-2 flex justify-between'>
                <span>Total Price:</span>
                <span>${totalPrice}</span>
              </div>
              <div className='mb-2 flex justify-between'>
                <span>Shipping Fee:</span>
                {/* <span>${shippingFee}</span> */
}
//         </div>
//         <div className='mb-4 flex justify-between font-bold'>
//           <span>Order Total:</span>
//           {/* <span>${totalPrice + shippingFee}</span> */}
//           <span>${totalPrice}</span>
//         </div>
//         <button className='w-full rounded bg-blue-500 py-2 text-white'>
//           Proceed to Checkout
//         </button>
//         <button className='mt-2 w-full rounded bg-gray-500 py-2 text-white'>
//           <Link to={'/'}>Add More Products</Link>
//         </button>
//       </div>
//     </div>
//   </div>
// </div> */}
