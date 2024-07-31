import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Search from '../../components/client/search/Search';
import { getCookie } from '../../helpers/cookie';
import { jwtDecode } from 'jwt-decode';
import { getUser } from '../../services/user';
import { Avatar, Badge, Button, Dropdown, Flex, Spin } from 'antd';
import {
  UserOutlined,
  DownOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import useUserStore from '../../zustandStore/UseUserStore';
import { getCartItems } from '../../services/cart';
import logoURL from '../../../public/logo.png';

const Header = () => {
  const token = getCookie('token');
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const [quantityCartItems, setQuantityCartItems] = useState(0);
  const [loading, setLoading] = useState(true);

  const updateCartQuantity = async () => {
    try {
      const cartItems = await getCartItems();
      const quantityProductInCart = cartItems.products.length;
      setQuantityCartItems(quantityProductInCart);
    } catch (error) {
      console.error('Failed to update cart quantity:', error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          const decodedUser = jwtDecode(token);
          const userInfo = await getUser(decodedUser.id);
          setUser(userInfo.user);
          await updateCartQuantity();
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [setUser, token]);

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

  const iconCart = (
    <Badge size='small' count={quantityCartItems}>
      <ShoppingCartOutlined style={{ fontSize: '24px' }} />
    </Badge>
  );

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/cart', label: iconCart },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/stores', label: 'List Stores' },
  ];

  let items = [];
  if (user) {
    items = [
      {
        key: '1',
        label: <NavLink to={`/users/${user.id}`}>My Profile</NavLink>,
      },
      {
        key: '2',
        label: <NavLink to={`/stores/my`}>My Store</NavLink>,
      },
      {
        key: '3',
        label: <NavLink to={`/orders/history`}>Purchase History</NavLink>,
      },
      {
        key: '4',
        label: <NavLink to='#'>Settings</NavLink>,
      },
      {
        key: '5',
        label: <NavLink to='/logout'>Logout</NavLink>,
      },
    ];
  }

  return (
    <div
      className="left-0 top-0 flex w-full items-center justify-between px-6 py-3"
      style={{ backgroundColor: "#fff", zIndex: 900 }}
    >
      <div className="flex items-center space-x-4 w-1/3">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logoURL} alt="Logo" className="w-16 h-16 rounded-full" />
          <span className="text-xl font-semibold">NAHA Marketplace</span>
        </Link>
      </div>
      <div className="w-2/6">
        <Search />
      </div>
      <nav className='flex w-3/6 items-center space-x-4'>
        <ul className='flex w-2/3 space-x-4'>
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive ? 'text-blue-400' : 'hover:text-gray-400'
                }
              >
                {typeof link.label === 'string' ? (
                  link.label
                ) : (
                  <span className='inline-flex items-center gap-1'>
                    {link.label}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className='flex w-1/3 justify-end space-x-4'>
          {token ? (
            <>
              <li>
                <Dropdown menu={{ items }}>
                  <Button type='text' onClick={(e) => e.preventDefault()}>
                    <NavLink to={`/users/${user.id}`} className='username'>
                      <Avatar
                        size='small'
                        src={user.avatar}
                        icon={!user.avatar && <UserOutlined />}
                      />
                    </NavLink>
                    <DownOutlined />
                  </Button>
                </Dropdown>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to='/login' className='login'>
                  Đăng nhập
                </NavLink>
              </li>
              <li>
                <NavLink to='/register'>Đăng ký</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
