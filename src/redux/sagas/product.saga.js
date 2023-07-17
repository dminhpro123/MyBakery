import { debounce, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
  getProductListRequest,
  getProductListSuccess,
  getProductListFailure,
  getProductDetailRequest,
  getProductDetailSuccess,
  getProductDetailFailure,
} from 'redux/slicers/product.slice';

function* getProductListSaga(action) {
  try {
    const { page, limit, categoryId, keyword, sort, more } = action.payload;
    const sortData = sort && {
      _sort: sort.split('.')[0],
      _order: sort.split('.')[1],
    };
    const result = yield axios.get('http://localhost:4000/products', {
      params: {
        _page: page,
        _limit: limit,
        categoryId: categoryId,
        name_like: keyword,
        ...sortData,
      },
    });
    yield put(
      getProductListSuccess({
        data: result.data,
        meta: {
          page,
          limit,
          total: parseInt(result.headers['x-total-count']),
        },
        more,
      })
    );
  } catch (e) {
    yield put(getProductListFailure('Đã có lỗi xảy ra!'));
  }
}

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/products/${id}`);
    yield put(getProductDetailSuccess({ data: result.data }));
  } catch (e) {
    yield put(getProductDetailFailure('Đã có lỗi xảy ra!'));
  }
}

export default function* productSaga() {
  yield debounce(400, getProductListRequest.type, getProductListSaga);
  yield takeEvery(getProductDetailRequest.type, getProductDetailSaga);
}
