import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
  getBakeryInformationRequest,
  getBakeryInformationSuccess,
  getBakeryInformationFailure,
} from 'redux/slicers/bakeryInformation.slice';

function* getBakeryInformationSaga() {
  try {
    const result = yield axios.get('http://localhost:4000/bakeryInformation');
    yield put(getBakeryInformationSuccess({ data: result.data }));
  } catch (e) {
    yield put(getBakeryInformationFailure('Đã có lỗi xảy ra!' + e));
  }
}

export default function* bakeryInformationSaga() {
  yield takeEvery(getBakeryInformationRequest.type, getBakeryInformationSaga);
}
