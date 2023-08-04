import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import productReducer from 'redux/slicers/product.slice';
import categoryReducer from 'redux/slicers/category.slice';
import bakeryInformationReducer from 'redux/slicers/bakeryInformation.slice';
import advertisementReducer from 'redux/slicers/advertisement.slice';
import newsReducer from 'redux/slicers/news.slice';
import authReducer from 'redux/slicers/auth.slice';
import contactReducer from 'redux/slicers/contact.slice';
import reviewReducer from 'redux/slicers/review.slice';
import cartReducer from 'redux/slicers/cart.slice';
import locationReducer from 'redux/slicers/location.slice';
import orderReducer from 'redux/slicers/order.slice';
import favoriteReducer from 'redux/slicers/favorite.slice';
import commonReducer from 'redux/slicers/common.slice';

import rootSaga from 'redux/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    bakeryInformation: bakeryInformationReducer,
    advertisement: advertisementReducer,
    news: newsReducer,
    auth: authReducer,
    contact: contactReducer,
    review: reviewReducer,
    cart: cartReducer,
    location: locationReducer,
    order: orderReducer,
    favorite: favoriteReducer,
    common: commonReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export { store };
