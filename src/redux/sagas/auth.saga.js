import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
} from 'redux/slicers/auth.slice';

function* loginSaga(action) {
  try {
    yield put(loginSuccess({ data: '' }));
  } catch (e) {
    yield put(loginFailure('Đã có lỗi xảy ra!'));
  }
}

function* registerSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post('http://localhost:4000/users', data);
    yield callback();
    yield put(registerSuccess({ data: result }));
  } catch (e) {
    yield put(registerFailure({ error: e }));
  }
}

export default function* authSaga() {
  yield takeEvery(loginRequest.type, loginSaga);
  yield takeEvery(registerRequest.type, registerSaga);
}
