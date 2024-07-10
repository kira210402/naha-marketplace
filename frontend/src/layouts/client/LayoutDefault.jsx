import { Link, NavLink, Outlet } from 'react-router-dom';
import Search from '../../components/client/search/Search';
// import NavBar from '../../components/client/navBar/NavBar';
import Footer from '../../components/client/footer/Footer';
import { getCookie } from '../../helpers/cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getUser } from '../../services/user';
import { setUser } from '../../redux/features/user';
// import { getCookie } from '../../helpers/cookie';
// import { jwtDecode } from 'jwt-decode';
// import getUser from '../../services/user';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/cart', label: 'Cart' },
];

const LayoutDefault = () => {
  const token = getCookie('token');
  const isLogin = useSelector((state) => state.loginReducer);
  console.log(isLogin);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.user.user);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  const user = data?.user;

  return (
    <>
      <div className='min-h-screen bg-gray-100'>
        <header className='bg-white shadow'>
          <div className='container mx-auto flex items-center justify-between px-6 py-3'>
            <div className='text-2xl font-bold'>
              <Link to="/">MyApp</Link>
            </div>
            <div>
              <Search />
            </div>
            <nav className='flex space-x-4'>
              <div>
                <ul className='flex space-x-4'>
                  {navLinks.map((link) => (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        className={({ isActive }) =>
                          isActive ? 'text-blue-400' : 'hover:text-gray-400'
                        }
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className='layout__default--account'>
                <ul>
                  {token ? (
                    <li>
                      <NavLink to='/info-user' className='username'>
                        {user.username}
                      </NavLink>
                      <NavLink to='/logout'>Đăng xuất</NavLink>
                    </li>
                  ) : (
                    <li>
                      <NavLink to='/login' className='login'>
                        Đăng nhập
                      </NavLink>
                      <NavLink to='/register'>Đăng ký</NavLink>
                    </li>
                  )}
                </ul>
              </div>
            </nav>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default LayoutDefault;
