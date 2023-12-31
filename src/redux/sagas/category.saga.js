import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
  getCategoryListRequest,
  getCategoryListSuccess,
  getCategoryListFailure,
} from 'redux/slicers/category.slice';

function* getCategoryListSaga() {
  try {
    const result = yield axios.get('http://localhost:4000/categories', {
      params: {
        _embed: 'products',
      },
    });
    yield put(getCategoryListSuccess({ data: result.data }));
  } catch (e) {
    yield put(getCategoryListFailure('Đã có lỗi xảy ra!' + e));
  }
}

export default function* categorySaga() {
  yield takeEvery(getCategoryListRequest.type, getCategoryListSaga);
}
