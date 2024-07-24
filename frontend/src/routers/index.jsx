import LayoutDefault from '../layouts/client/LayoutDefault';
import CartPage from '../pages/client/cart/CartPage';
import HomePage from '../pages/client/HomePage';
import LoginPage from '../pages/client/LoginPage';
import ProductDetailPage from '../pages/client/productDetail/ProductDetailPage';
import RegisterPage from '../pages/client/RegisterPage';
import PrivateRoute from '../components/client/AllRouter/privateRouter';
import UserProfilePage from '../pages/client/UserProfilePage';
import Logout from '../pages/client/Logout';
import SearchResult from '../pages/client/search/SearchResult';
import StoreDetailPage from '../pages/client/store/StoreDetailPage';
import MyStore from '../pages/client/store/MyStore';
import ListStorePage from '../pages/client/listStore/ListStorePage';
import CheckoutPage from '../pages/client/order/CheckoutPage';
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
      { path: '/search/result', element: <SearchResult /> },
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
        children: [
          {
            path: '/stores',
            element: <ListStorePage />,
          },
          {
            path: '/stores/:id',
            element: <StoreDetailPage />,
          },
        ],
      },
      {
        path: '/checkout',
        element: <CheckoutPage />,
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
    path: '/stores/my',
    element: <MyStore />,
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
