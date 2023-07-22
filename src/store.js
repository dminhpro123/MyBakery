import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import productReducer from 'redux/slicers/product.slice';
import categoryReducer from 'redux/slicers/category.slice';
import bakeryInformationReducer from 'redux/slicers/bakeryInformation.slice';
import advertismentReducer from 'redux/slicers/advertisment.slice';
import newsReducer from 'redux/slicers/news.slice';
import authReducer from 'redux/slicers/auth.slice';
import contactReducer from 'redux/slicers/contact.slice';
import reviewReducer from 'redux/slicers/review.slice';
import cartReducer from 'redux/slicers/cart.slice';

import rootSaga from 'redux/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    bakeryInformation: bakeryInformationReducer,
    advertisment: advertismentReducer,
    news: newsReducer,
    auth: authReducer,
    contact: contactReducer,
    review: reviewReducer,
    cart: cartReducer,
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
