import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
  getNewsListRequest,
  getNewsListSuccess,
  getNewsListFailure,
  getNewsDetailRequest,
  getNewsDetailSuccess,
  getNewsDetailFailure,
} from 'redux/slicers/news.slice';

function* getNewsListSaga() {
  try {
    const result = yield axios.get('http://localhost:4000/news');
    yield put(getNewsListSuccess({ data: result.data }));
  } catch (e) {
    yield put(getNewsListFailure('Đã có lỗi xảy ra!' + e));
  }
}

function* getNewsDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get('http://localhost:4000/news', {
      params: {
        id,
      },
    });
    yield put(getNewsDetailSuccess({ data: result.data }));
  } catch (e) {
    yield put(getNewsDetailFailure('Đã có lỗi xảy ra!' + e));
  }
}

export default function* newsSaga() {
  yield takeEvery(getNewsListRequest.type, getNewsListSaga);
  yield takeEvery(getNewsDetailRequest.type, getNewsDetailSaga);
}
