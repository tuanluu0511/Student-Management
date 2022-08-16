import { PayloadAction } from '@reduxjs/toolkit';
import { take, fork } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  console.log('Log in', payload);
}

function* handleLogout() {
  console.log('Log out');
}

function* watchLoginFlow() {
  while (true) {
    const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
    yield fork(handleLogin, action.payload);

    yield take(authActions.logout.type);
    yield fork(handleLogout);
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
