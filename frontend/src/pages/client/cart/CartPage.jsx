import { useEffect, useState } from 'react';
import { getCartItems, updateCart } from '../../../services/cart';
import { useDispatch } from 'react-redux';
import { getCookie } from '../../../helpers/cookie';
import { jwtDecode } from 'jwt-decode';
import { getUser } from '../../../services/user';
import { setUser } from '../../../redux/features/user';
import { Button, InputNumber, message, Table } from 'antd';
import DeleteCartItem from '../../../components/client/CartPage/DeleteCartItem';
import { useNavigate } from 'react-router-dom';
import { vnd } from '../../../components/client/FormatPrice';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleReload = () => {
    fetchData();
  };

  const handleClickThanhToan = () => {
    if (cartItems.length !== 0) {
      navigate('/checkout', {
        state: {
          selectedCartItems: selectedRows,
          totalPrice: totalPrice,
        },
      });
    } else {
      message.error('Giỏ hàng trống');
    }
  };

  const handleQuantityChange = async (updatedItems) => {
    await updateCart(updatedItems);
  };

  const handleQuantityChangeLocal = (id, value) => {
    const updatedItems = cartItems.map((item) =>
      item.product.id === id
        ? {
            ...item,
            quantity: value,
            totalPrice:
              (value * item.product.price * (100 - item.product.discount)) /
              100,
          }
        : item,
    );
    setCartItems(updatedItems);
    handleQuantityChange(updatedItems);
  };

  const totalPrice = selectedRows.reduce(
    (total, item) =>
      total +
      item.product.price * item.quantity * (1 - item.product.discount / 100),
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
      width: 90,
      key: 'images',
      render: (_, record) => {
        const images = record.product.images;
        return images !== null ? (
          <img src={images[0]} className='h-[90px] w-[90px] object-cover' />
        ) : (
          <></>
        );
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
      title: <div style={{ fontSize: '1rem' }}>Unit Price</div>,
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      width: 150,
      render: (_, record) => {
        const price = record.product.price;
        const discount = record.product.discount;
        return (
          <div className='flex gap-2'>
            <span className='text-gray-400 line-through'>
              {vnd.format(record.product.price)}
            </span>
            <p>{vnd.format(((price * (100 - discount)) / 100).toFixed(2))}</p>
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
      render: (_, record) => {
        return (
          <>
            <InputNumber
              defaultValue={record.quantity}
              min={1}
              max={record.product.quantity}
              onChange={(value) =>
                handleQuantityChangeLocal(record.product.id, value)
              }
            />
            <p className='text-red-500'>stock: {record.product.quantity}</p>
          </>
        );
      },
      ellipsis: true,
    },
    {
      title: <div style={{ fontSize: '1rem' }}>Price</div>,
      dataIndex: 'price',
      key: 'price',
      width: 130,
      render: (_, record) => {
        const price = record.product.price;
        const discount = record.product.discount;
        const quantity = record.quantity;
        return (
          <p className='text-red-500'>
            {vnd.format(
              (((price * (100 - discount)) / 100) * quantity).toFixed(2),
            )}
          </p>
        );
      },
      ellipsis: true,
    },
    {
      title: 'Actions',
      width: 100,
      key: 'actions',
      dataIndex: 'actions',
      render: (_, record) => {
        return (
          <>
            <DeleteCartItem data={record} onReload={handleReload} />
          </>
        );
      },
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      setSelectedRows(selectedRows);
    },
    onSelectAll: (selected, selectedRows) => {
      setSelectedRows(selectedRows);
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
        <p>Total Price: {vnd.format(totalPrice.toFixed(2))}</p>
        <Button type='primary' onClick={handleClickThanhToan}>
          Thanh toán
        </Button>
      </div>
    </>
  );
};

export default CartPage;
