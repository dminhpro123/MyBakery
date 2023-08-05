import { debounce, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
  getProductListRequest,
  getProductListSuccess,
  getProductListFailure,
  getProductDetailRequest,
  getProductDetailSuccess,
  getProductDetailFailure,
  addViewProductRequest,
  addViewProductSuccess,
  addViewProductFailure,
  getOutstandingProductListRequest,
  getOutstandingProductListSuccess,
  getOutstandingProductListFailure,
  getNewProductListRequest,
  getNewProductListSuccess,
  getNewProductListFailure,
  getSimilarProductListRequest,
  getSimilarProductListSuccess,
  getSimilarProductListFailure,
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
        _expand: 'category',
        _embed: ['reviews', 'favorites'],
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
    const result = yield axios.get(`http://localhost:4000/products/${id}`, {
      params: {
        _expand: 'category',
        _embed: 'favorites',
      },
    });
    yield put(getProductDetailSuccess({ data: result.data }));
  } catch (e) {
    yield put(getProductDetailFailure('Đã có lỗi xảy ra!'));
  }
}

function* addViewProductSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.patch(
      `http://localhost:4000/products/${id}`,
      data
    );
    yield put(addViewProductSuccess({ data: result.data }));
  } catch (e) {
    yield put(addViewProductFailure('Đã có lỗi xảy ra!:' + e));
  }
}

function* getOutstandingProductListSaga(action) {
  try {
    const result = yield axios.get('http://localhost:4000/products', {
      params: {
        _embed: ['reviews', 'favorites'],
        _sort: 'view',
        _order: 'desc',
        _limit: 8,
      },
    });
    yield put(
      getOutstandingProductListSuccess({
        data: result.data,
      })
    );
  } catch (e) {
    yield put(getOutstandingProductListFailure('Đã có lỗi xảy ra!'));
  }
}

function* getNewProductListSaga(action) {
  try {
    const result = yield axios.get('http://localhost:4000/products', {
      params: {
        _embed: ['reviews', 'favorites'],
        _sort: 'createdAt',
        _order: 'desc',
        _limit: 8,
      },
    });
    yield put(
      getNewProductListSuccess({
        data: result.data,
      })
    );
  } catch (e) {
    yield put(getNewProductListFailure('Đã có lỗi xảy ra!'));
  }
}

function* getSimilarProductListSaga(action) {
  const { categoryId } = action.payload;
  try {
    const result = yield axios.get('http://localhost:4000/products', {
      params: {
        categoryId: parseInt(categoryId),
        _limit: 8,
      },
    });
    yield put(
      getSimilarProductListSuccess({
        data: result.data,
      })
    );
  } catch (e) {
    yield put(getSimilarProductListFailure('Đã có lỗi xảy ra!'));
  }
}

export default function* productSaga() {
  yield debounce(400, getProductListRequest.type, getProductListSaga);
  yield takeEvery(getProductDetailRequest.type, getProductDetailSaga);
  yield takeEvery(addViewProductRequest.type, addViewProductSaga);
  yield takeEvery(
    getOutstandingProductListRequest.type,
    getOutstandingProductListSaga
  );
  yield takeEvery(getNewProductListRequest.type, getNewProductListSaga);
  yield takeEvery(getSimilarProductListRequest.type, getSimilarProductListSaga);
}
