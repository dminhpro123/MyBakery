import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
  getAdvertisementListRequest,
  getAdvertisementListSuccess,
  getAdvertisementListFailure,
} from 'redux/slicers/advertisement.slice';

function* getAdvertisementListSaga() {
  try {
    const result = yield axios.get('http://localhost:4000/advertisement');
    yield put(getAdvertisementListSuccess({ data: result.data }));
  } catch (e) {
    yield put(getAdvertisementListFailure('Đã có lỗi xảy ra!' + e));
  }
}

export default function* advertisementSaga() {
  yield takeEvery(getAdvertisementListRequest.type, getAdvertisementListSaga);
}
