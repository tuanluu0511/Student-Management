import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions } from '../authSlice';
import { LoadingProgress } from 'components/Common';
import './LoginPage.scss';

export interface LoginPageProps {}

export default function LoginPage(props: LoginPageProps) {
  const dispatch = useAppDispatch();
  const isLogging = useAppSelector((state) => state.auth.logging);

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
          {isLogging && <LoadingProgress />}
          Fake login
        </button>
      </div>
    </div>
  );
}
