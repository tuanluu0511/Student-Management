import cityApi from 'api/cityApi';
import { useAppDispatch } from 'app/hooks';
import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import { authActions } from 'features/auth/authSlice';
import LoginPage from 'features/auth/pages/LoginPage';
import { Fragment, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';

function App() {
  const dispatch = useAppDispatch();
  console.log('app render');
  useEffect(() => {
    cityApi.getAll().then((response) => console.log(response));
  });

  return (
    <Fragment>
      <button
        className="header_btn"
        onClick={() => {
          dispatch(authActions.logout());
        }}
      >
        Log out
      </button>

      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>

        <Route path="/login" element={<LoginPage />} />

        <Route path="/admin/*" element={<PrivateRoute />}>
          <Route path="" element={<AdminLayout />} />

          <Route path="test" element={<div>Admin test page.</div>} />

          <Route path="*" element={<div>No page found. Please log in to continue</div>} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
}

export default App;
