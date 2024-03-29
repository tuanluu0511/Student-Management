import { PayloadAction } from '@reduxjs/toolkit';
import { take, fork, call, delay, put } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';
import { push } from 'redux-first-history';

function* handleLogin(payload: LoginPayload) {
  try {
    localStorage.setItem('access_token', 'fake_token');
    yield delay(1000);

    yield put(
      authActions.loginSuccess({
        name: 'Test name',
        id: '1',
      })
    );
    //redirect to admin page
    yield put(push('/admin/dashboard'));
  } catch (error: any) {
    yield put(authActions.loginFailed(error.message));
  }
}

function* handleLogout() {
  yield delay(500);
  localStorage.removeItem('access_token');
  //redirect to login page
  yield put(push('/login'));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
