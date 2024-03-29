import { studentActions } from './studentSlice';
import { takeLatest, call, put, debounce } from 'redux-saga/effects';
import studentApi from 'api/studentApi';
import { ListParams, ListResponse, Student } from 'models';
import { PayloadAction } from '@reduxjs/toolkit';

function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);

    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch student list', error);
    yield put(studentActions.fetStudentListFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(studentActions.setFilter(action.payload));
  console.log('Updated filter');
}

export default function* studentSaga() {
  yield takeLatest(studentActions.fetchStudentList.type, fetchStudentList);

  yield debounce(500, studentActions.setFilterDebounce.type, handleSearchDebounce);
}
