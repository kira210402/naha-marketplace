import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Search from '../../components/client/search/Search';
import { getCookie } from '../../helpers/cookie';
import { jwtDecode } from 'jwt-decode';
import { getUser } from '../../services/user';
import { Flex, Spin } from 'antd';
import useUserStore from '../../zustandStore/UseUserStore';
const iconCart = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='h-6 w-6'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
    />
  </svg>
);

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/cart', label: iconCart },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/stores', label: 'Stores' },
];

const Header = () => {
  const token = getCookie('token');
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          const decodedUser = jwtDecode(token);
          const userInfo = await getUser(decodedUser.id);
          setUser(userInfo.user);
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

  console.log(user);

  return (
    <header className='bg-white shadow'>
      <div className='container mx-auto flex items-center justify-between px-6 py-3'>
        <div className='w-1/6 text-2xl font-bold'>
          <Link to='/'>MyApp</Link>
        </div>
        <div className='w-2/6'>
          <Search />
        </div>
        <nav className='flex w-3/6 space-x-4'>
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
          <ul className='layout__default--account flex space-x-4'>
            {token ? (
              <>
                <li>
                  <NavLink to={`/users/${user.id}`} className='username'>
                    {user.username ? user.username : 'username'}
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/logout'>Đăng xuất</NavLink>
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
    </header>
  );
};

export default Header;
