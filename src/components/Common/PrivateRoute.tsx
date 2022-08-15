import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoute() {
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  // const isLoggedIn = true;
  // if (!isLoggedIn) return <Navigate to="/login" />;

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
