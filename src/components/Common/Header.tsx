import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';
import './Header.scss';

export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="header">
      <h3 className="header__title">Student Management</h3>
      <button
        type="button"
        className="header__btn"
        onClick={() => {
          dispatch(authActions.logout());
        }}
      >
        Log out
      </button>
    </div>
  );
}
