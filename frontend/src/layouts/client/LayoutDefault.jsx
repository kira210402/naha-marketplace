import { Link, NavLink, Outlet } from 'react-router-dom';
import Search from '../../components/client/search/Search';
// import NavBar from '../../components/client/navBar/NavBar';
import Footer from '../../components/client/footer/Footer';
// import { getCookie } from '../../helpers/cookie';
// import { jwtDecode } from 'jwt-decode';
// import getUser from '../../services/user';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/register', label: 'Register' },
  { to: '/login', label: 'Login' },
  { to: '/users', label: 'User' },
];

const LayoutDefault = () => {
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
              {/* <NavBar /> */}
            </div>
            <nav>
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
