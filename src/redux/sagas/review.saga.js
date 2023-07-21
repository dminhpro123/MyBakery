import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
  getReviewListRequest,
  getReviewListSuccess,
  getReviewListFailure,
  createReviewRequest,
  createReviewSuccess,
  createReviewFailure,
} from 'redux/slicers/review.slice';

function* getReviewListSaga(action) {
  try {
    const { productId } = action.payload;
    const result = yield axios.get('http://localhost:4000/reviews', {
      params: {
        productId,
        _sort: 'id',
        _order: 'desc',
        _expand: 'user',
      },
    });
    yield put(getReviewListSuccess({ data: result.data }));
  } catch (e) {
    yield put(getReviewListFailure('Đã có lỗi xảy ra!' + e));
  }
}

function* createReviewListSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post('http://localhost:4000/reviews', data);
    yield put(getReviewListSaga({ productId: data.productId }));
    yield callback();
    yield put(createReviewSuccess({ data: result.data }));
  } catch (e) {
    yield put(createReviewFailure('Đã có lỗi xảy ra!' + e));
  }
}

export default function* reviewSaga() {
  yield takeEvery(getReviewListRequest.type, getReviewListSaga);
  yield takeEvery(createReviewRequest.type, createReviewListSaga);
}
