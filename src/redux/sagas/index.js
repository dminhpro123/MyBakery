import { fork } from 'redux-saga/effects';

import productSaga from './product.saga';
import categorySaga from './category.saga';
import bakeryInformationSaga from './bakeryInformation.saga';
import advertisementSaga from './advertisement.saga';
import newsSaga from './news.saga';
import authSaga from './auth.saga';
import reviewSaga from './review.saga';
import locationSaga from './location.saga';
import orderSaga from './order.saga';
import favoriteSaga from './favorite.saga';

export default function* rootSaga() {
  yield fork(productSaga);
  yield fork(categorySaga);
  yield fork(bakeryInformationSaga);
  yield fork(advertisementSaga);
  yield fork(newsSaga);
  yield fork(authSaga);
  yield fork(reviewSaga);
  yield fork(locationSaga);
  yield fork(orderSaga);
  yield fork(favoriteSaga);
}
