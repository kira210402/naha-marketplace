import LayoutDefault from '../layouts/client/LayoutDefault';
import CartPage from '../pages/client/cart/CartPage';
import HomePage from '../pages/client/HomePage';
import LoginPage from '../pages/client/LoginPage';
import ProductDetailPage from '../pages/client/productDetail/ProductDetailPage';
import RegisterPage from '../pages/client/RegisterPage';
import StorePage from '../pages/client/store/StorePage';
import PrivateRoute from '../components/client/AllRouter/privateRouter';
import UserProfilePage from '../pages/client/UserProfilePage';
import Logout from '../pages/client/Logout';
export const routes = [
  {
    path: '/',
    element: <LayoutDefault />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/products/:id',
        element: <ProductDetailPage />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: '/users/:id',
            element: <UserProfilePage />,
          },
        ],
      },
      {
        path: '/stores/:id',
        element: <StorePage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/logout',
        element: <Logout />,
      },
      {
        path: '*',
        redirectTo: '/',
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
];
