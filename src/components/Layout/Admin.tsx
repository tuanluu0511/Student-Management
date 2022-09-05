import { Header, Sidebar } from 'components/Common';
import { Outlet } from 'react-router-dom';
import './Admin.scss';

export interface AdminLayoutProps {}

export function AdminLayout(props: AdminLayoutProps) {
  console.log('admin layout');
  return (
    <div className="container">
      <div className="header-container">
        <Header />
      </div>
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="main-container">
        <Outlet />
      </div>
    </div>
  );
}
