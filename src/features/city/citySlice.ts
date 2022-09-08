import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City, ListResponse } from 'models';
import { RootState } from './../../app/store';

export interface CityState {
  loading: boolean;
  cityList: { [key: string]: City };
}

const initialState: CityState = {
  loading: false,
  cityList: {},
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    fetchCityList(state) {
      state.loading = true;
    },
    fetchCityListSuccess(state, action: PayloadAction<ListResponse<City>>) {
      state.loading = false;
      const cities = action.payload.data;
      cities.forEach((city) => {
        state.cityList[city.code] = city;
      });
    },
    fetchCityListFailed(state) {
      state.loading = false;
    },
  },
});

//Actions:
export const cityActions = citySlice.actions;

//Selectors:
export const selectCityList = (state: RootState) => state.city.cityList;

//Reducers:
const cityReducer = citySlice.reducer;
export default cityReducer;
