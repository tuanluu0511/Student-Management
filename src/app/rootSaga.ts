import { PayloadAction } from '@reduxjs/toolkit';
import { incrementSaga, incrementSagaSuccess } from 'features/counter/counterSlice';

import { all, delay, put, takeEvery } from 'redux-saga/effects';

function* handleIncrementSaga(action: PayloadAction<number>) {
  console.log('Wait 1s');

  yield delay(1000);
  console.log('Waiting done, dispatch action');

  yield put(incrementSagaSuccess(action.payload));
}

function* counterSaga() {
  console.log('Counter saga');
  yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
}

export default function* rootSaga() {
  console.log('Root saga');
  yield all([helloSaga()]);
}
