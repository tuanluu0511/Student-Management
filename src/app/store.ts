import { Action, configureStore, ThunkAction, combineReducers } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import createSagaMiddleware from 'redux-saga';
import counterReducer from '../features/counter/counterSlice';
import rootSaga from './rootSaga';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
});

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  router: routerReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware),
});

sagaMiddleware.run(rootSaga);

export const history = createReduxHistory(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
