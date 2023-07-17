import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
  getAdvertismentListRequest,
  getAdvertismentListSuccess,
  getAdvertismentListFailure,
} from 'redux/slicers/advertisment.slice';

function* getAdvertismentListSaga() {
  try {
    const result = yield axios.get('http://localhost:4000/advertisment');
    yield put(getAdvertismentListSuccess({ data: result.data }));
  } catch (e) {
    yield put(getAdvertismentListFailure('Đã có lỗi xảy ra!' + e));
  }
}

export default function* advertismentSaga() {
  yield takeEvery(getAdvertismentListRequest.type, getAdvertismentListSaga);
}
