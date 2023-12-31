import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

import {
  getFavoriteListRequest,
  getFavoriteListSuccess,
  getFavoriteListFailure,
  favoriteProductRequest,
  favoriteProductSuccess,
  favoriteProductFailure,
  unFavoriteProductRequest,
  unFavoriteProductSuccess,
  unFavoriteProductFailure,
  deleteFavoriteProductRequest,
  deleteFavoriteProductSuccess,
  deleteFavoriteProductFailure,
} from 'redux/slicers/favorite.slice';

function* getFavoriteListSaga(action) {
  try {
    const { userId } = action.payload;
    const result = yield axios.get('http://localhost:4000/favorites', {
      params: {
        userId: userId,
        _expand: 'product',
        _sort: 'id',
        _order: 'desc',
      },
    });
    yield put(getFavoriteListSuccess({ data: result.data }));
  } catch (e) {
    yield put(getFavoriteListFailure({ error: 'Lỗi' }));
  }
}

function* favoriteProductSaga(action) {
  try {
    const result = yield axios.post(
      'http://localhost:4000/favorites',
      action.payload
    );

    yield put(favoriteProductSuccess({ data: result.data }));
  } catch (e) {
    yield put(favoriteProductFailure({ error: e }));
  }
}

function* unFavoriteProductSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`http://localhost:4000/favorites/${id}`);
    yield put(unFavoriteProductSuccess({ id: id }));
  } catch (e) {
    yield put(unFavoriteProductFailure({ error: e }));
  }
}

function* deleteFavoriteProductSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`http://localhost:4000/favorites/${id}`);
    yield put(deleteFavoriteProductSuccess({ id: id }));
  } catch (e) {
    yield put(deleteFavoriteProductFailure({ error: e }));
  }
}

export default function* favoriteSaga() {
  yield takeEvery(getFavoriteListRequest.type, getFavoriteListSaga);
  yield takeEvery(favoriteProductRequest.type, favoriteProductSaga);
  yield takeEvery(unFavoriteProductRequest.type, unFavoriteProductSaga);
  yield takeEvery(deleteFavoriteProductRequest.type, deleteFavoriteProductSaga);
}
