import LayoutDefault from "../layouts/client/LayoutDefault";
import ErrorPage from "../pages/client/ErrorPage";
import HomePage from "../pages/client/HomePage";
import LoginPage from "../pages/client/LoginPage";
import RegisterPage from "../pages/client/RegisterPage";

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
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
];
