import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
  const token = true;
  return <>{token ? <Outlet /> : <Navigate to='/login' />}</>;
}

export default PrivateRoute;
