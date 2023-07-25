import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productList: {
    data: [],
    meta: {},
    loading: false,
    error: null,
  },

  productDetail: {
    data: {},
    loading: false,
    error: null,
  },
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // product list
    getProductListRequest: (state, action) => {
      state.productList.loading = true;
      state.productList.error = null;
    },
    getProductListSuccess: (state, action) => {
      const { data, meta, more } = action.payload;
      state.productList.loading = false;
      state.productList.data = more
        ? [...state.productList.data, ...data]
        : data;
      state.productList.meta = meta;
    },
    getProductListFailure: (state, action) => {
      const { error } = action.payload;
      state.productList.loading = false;
      state.productList.error = error;
    },

    // product detail
    getProductDetailRequest: (state, action) => {
      state.productDetail.loading = true;
      state.productDetail.error = null;
    },
    getProductDetailSuccess: (state, action) => {
      const { data } = action.payload;
      state.productDetail.loading = false;
      state.productDetail.data = data;
    },
    getProductDetailFailure: (state, action) => {
      const { error } = action.payload;
      state.productDetail.loading = false;
      state.productDetail.error = error;
    },

    //addViewProduct
    addViewProductRequest: (state, action) => {
      state.productDetail.loading = true;
      state.productDetail.error = null;
    },
    addViewProductSuccess: (state, action) => {
      const { data } = action.payload;
      state.productDetail.error = null;
      state.productDetail.data = data;
    },
    addViewProductFailure: (state, action) => {
      const { error } = action.payload;
      state.productDetail.loading = false;
      state.productDetail.error = error;
    },
  },
});

export const {
  getProductListRequest,
  getProductListSuccess,
  getProductListFailure,
  getProductDetailRequest,
  getProductDetailSuccess,
  getProductDetailFailure,
  addViewProductRequest,
  addViewProductSuccess,
  addViewProductFailure,
} = productSlice.actions;

export default productSlice.reducer;
