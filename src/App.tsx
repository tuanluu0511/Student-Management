import cityApi from 'api/cityApi';
import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  console.log('app render');
  useEffect(() => {
    cityApi.getAll().then((response) => console.log(response));
  });

  return (
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
  );
}

export default App;
