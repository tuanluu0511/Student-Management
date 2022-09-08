import { cityActions } from './citySlice';
import cityApi from 'api/cityApi';
import { City, ListResponse } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';

function* fetchCityList() {
  try {
    const response: ListResponse<City> = yield call(cityApi.getAll);

    yield put(cityActions.fetchCityListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch City', { error });
    yield put(cityActions.fetchCityListFailed());
  }
}

export default function* citySaga() {
  yield takeLatest(cityActions.fetchCityList.type, fetchCityList);
}
