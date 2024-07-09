import LayoutDefault from "../layouts/client/LayoutDefault";
import CartPage from '../pages/client/cart/CartPage';
import HomePage from "../pages/client/HomePage";
import LoginPage from "../pages/client/LoginPage";
import ProductDetailPage from '../pages/client/productDetail/ProductDetailPage';
import RegisterPage from "../pages/client/RegisterPage";
import StorePage from '../pages/client/store/StorePage';

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/products/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/stores/:id",
        element: <StorePage />,
      },
      {
        path: "/cart/:id",
        element: <CartPage />,
      },
      {
        path: "*",
        redirectTo: "/", // Redirect to home page if the route doesn't exist
      },
    ],
  },
];
