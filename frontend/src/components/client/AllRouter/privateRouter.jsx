import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
  const tokenUser = true;
  return <>{tokenUser ? <Outlet /> : <Navigate to='/login' />}</>;
}

export default PrivateRoute;
