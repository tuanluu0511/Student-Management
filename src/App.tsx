import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import Dashboard from 'features/dashboard';
import StudentFeature from 'features/students';
import AddEditPage from 'features/students/pages/AddEditPage';
import ListPage from 'features/students/pages/ListPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';

function App() {
  const isLoggedIn = localStorage.getItem('access_token');

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="admin/dashboard" /> : <Navigate to="/login" />}
      ></Route>

      <Route path="/login" element={<LoginPage />} />

      <Route path="/admin/*" element={<PrivateRoute />}>
        <Route path="" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<StudentFeature />}>
            <Route path="" element={<ListPage />} />
            <Route path="add" element={<AddEditPage />} />
            <Route path=":studentId" element={<AddEditPage />} />
          </Route>
        </Route>

        <Route path="*" element={<div>No page found. Please log in to continue</div>} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
