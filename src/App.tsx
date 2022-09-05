import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import Dashboard from 'features/dashboard';
import StudentFeature from 'features/students';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />}></Route>

      <Route path="/login" element={<LoginPage />} />

      <Route path="/admin/*" element={<PrivateRoute />}>
        <Route path="" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<StudentFeature />} />
        </Route>

        <Route path="*" element={<div>No page found. Please log in to continue</div>} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
