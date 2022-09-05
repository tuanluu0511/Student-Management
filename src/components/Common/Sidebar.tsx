import { BsFillCalendar2Fill, BsFillPeopleFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

export interface SidebarProps {}

export function Sidebar(props: SidebarProps) {
  return (
    <nav className="sidebar">
      <NavLink to="/admin/dashboard" className="sidebar__item">
        <BsFillCalendar2Fill /> Dashboard
      </NavLink>

      <NavLink to="/admin/students" className="sidebar__item">
        <BsFillPeopleFill /> Students
      </NavLink>
    </nav>
  );
}
