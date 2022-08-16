import { useAppDispatch } from 'app/hooks';
import { authActions } from '../authSlice';

import './LoginPage.scss';

export interface LoginPageProps {}

export default function LoginPage(props: LoginPageProps) {
  const dispatch = useAppDispatch();

  //TODO: get user name and pwd from login form
  const loginHandler = () => {
    dispatch(
      authActions.login({
        username: '',
        password: '',
      })
    );
  };

  return (
    <div className="login">
      <div className="login_box">
        <h1 className="login--title">Student Management</h1>
        <button type="button" className="login--btn" onClick={loginHandler}>
          Fake login
        </button>
      </div>
    </div>
  );
}
